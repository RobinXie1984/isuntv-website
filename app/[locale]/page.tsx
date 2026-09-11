import { checkedLocale } from '../../lib/metadata';
import { BrandHome } from '../brand-home';
import { brandMetadata } from '../../lib/brand-pages';
export default async function Page({params}: {params: Promise<{locale: string}>}) { return <BrandHome locale={checkedLocale((await params).locale)} />; }
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { return brandMetadata('', checkedLocale((await params).locale)); }
