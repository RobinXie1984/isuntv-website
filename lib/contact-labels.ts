import { translator } from './brand-i18n';
import type { BrandLocale } from './brand-pages';
const source = {
  "Loading the form. You can also email partner@isuntv.com.": "正在載入表單，亦可直接寄信至 partner@isuntv.com。",
  "Your enquiry has been accepted for delivery. We will reply by email.": "查詢已獲郵件服務接收，我們會透過電郵回覆。",
  "Full name": "姓名",
  "Enquiry": "合作方向",
  "Submit enquiry": "提交查詢",
  "Brand licensing": "品牌授權",
  "Business email": "聯絡電郵",
  "Privacy notice": "私隱說明",
  "Delivery could not be confirmed. Please email partner@iSunTV.com directly.": "目前無法確認寄送結果。請直接寄信至 partner@iSunTV.com。",
  "Interviews": "採訪合作",
  "Organization": "機構名稱",
  "Sending…": "傳送中…",
  "For enquiries, please email partner@iSunTV.com directly. Online submission is not yet available.": "請直接寄信至 partner@iSunTV.com 洽談合作。網上提交尚未開放。",
  "Other enquiry": "其他查詢",
  "I agree to the use of my details to handle this enquiry.": "我同意使用上述資料處理本次查詢。",
  "Going global": "華商出海",
  "How can we help?": "合作構想"
};
export function contactLabels(locale: BrandLocale) { const t = translator(locale); return Object.fromEntries(Object.entries(source).map(([en, zh]) => [en, t(zh, en)])); }
