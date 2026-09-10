import { Catalogue } from '../../catalogue';
import { checkedLocale } from '../../../lib/metadata';
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <Catalogue locale={checkedLocale((await params).locale)} />;
}
