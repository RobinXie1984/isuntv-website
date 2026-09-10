/** iSunTV enquiry relay. Execute as admin@tideisun.com; MailApp send-only scope.
 * Set RELAY_SECRET in Script Properties. Never put it in source or logs.
 * No inbox access. Recipient fixed. No enquiry body persisted by this script.
 */
function jsonReply(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
function doGet() { return jsonReply({service:'iSunTV enquiry relay', accepts:'signed POST only'}); }
function doPost(e) {
  try {
    if (!e || !e.postData || e.postData.contents.length > 20000) return jsonReply({accepted:false});
    var request = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    var secret = props.getProperty('RELAY_SECRET');
    if (!secret || typeof request.payload !== 'string' || typeof request.signature !== 'string') return jsonReply({accepted:false});
    var expected = Utilities.computeHmacSha256Signature(request.payload, secret).map(function(b){return ('0'+(b&255).toString(16)).slice(-2);}).join('');
    var difference = expected.length ^ request.signature.length;
    for (var i=0;i<expected.length;i++) difference |= expected.charCodeAt(i) ^ (request.signature.charCodeAt(i)||0);
    if (difference !== 0) return jsonReply({accepted:false});
    var data = JSON.parse(request.payload);
    if (!Number.isFinite(data.timestamp) || Math.abs(Date.now()-data.timestamp)>120000 || !/^[a-f0-9-]{36}$/.test(data.nonce) || !/^[a-f0-9]{64}$/.test(data.visitor)) return jsonReply({accepted:false});
    if (typeof data.name !== 'string' || !data.name.trim() || data.name.length>100 || typeof data.organization !== 'string' || !data.organization.trim() || data.organization.length>150 || typeof data.email !== 'string' || data.email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || typeof data.message !== 'string' || data.message.length<10 || data.message.length>4000 || ['global','interviews','licensing','other'].indexOf(data.interest)<0) return jsonReply({accepted:false});
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(4000)) return jsonReply({accepted:false,reason:'busy'});
    try {
      var cache = CacheService.getScriptCache();
      if (cache.get('nonce:'+data.nonce)) return jsonReply({accepted:false,reason:'duplicate'});
      var day = Utilities.formatDate(new Date(),'UTC','yyyy-MM-dd');
      var total = props.getProperty('DAY')===day ? Number(props.getProperty('COUNT')||0) : 0;
      var count = Number(cache.get('visitor:'+data.visitor)||0);
      if (total>=100 || count>=3 || MailApp.getRemainingDailyQuota()<1) return jsonReply({accepted:false,reason:'rate-limit'});
      // Reserve before sending: errors never trigger an automatic retry or duplicate mail.
      props.setProperties({DAY:day,COUNT:String(total+1)});
      cache.put('visitor:'+data.visitor,String(count+1),900);
      cache.put('nonce:'+data.nonce,'1',600);
      MailApp.sendEmail({to:'partner@isuntv.com',replyTo:data.email,name:'iSunTV website enquiries',subject:'iSunTV enquiry: '+data.interest,body:'Reference: '+data.nonce+'\nName: '+data.name+'\nOrganization: '+data.organization+'\nEmail: '+data.email+'\nInterest: '+data.interest+'\n\n'+data.message});
      return jsonReply({accepted:true,id:data.nonce});
    } finally { lock.releaseLock(); }
  } catch (error) { return jsonReply({accepted:false}); }
}
