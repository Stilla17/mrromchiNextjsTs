import Image from "next/image";
import Link from "next/link";

export default function WorkspaceBrand() {
  return <Link href="/role/" className="flex shrink-0 items-center gap-4 [&>img]:h-[58px] [&>img]:w-[78px] [&>img]:object-contain [&>span:last-child]:text-[10px] [&>span:last-child]:font-semibold [&>span:last-child]:tracking-[1.8px] [&>span:last-child]:text-[#7b8588]" aria-label="GrandWindow — boshlash">
    <Image src="/logodark.png" alt="GrandWindow" width={78} height={56} priority />
    <span className="h-7 w-px bg-[#e2e6e5]" /><span>ISH MAYDONI</span>
  </Link>;
}
