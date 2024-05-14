"use client"
import { usePathname } from "next/navigation"

const page = () => {
    const pathName = usePathname()
    const pageName = pathName.slice(7).replace("%20", " ")
    return (
        <div>page {pageName}</div>
    )
}

export default page