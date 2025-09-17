// import { getDictionary } from '@/lib/dictionary'
import { ThemeToggle } from '@/components/theme-toggle'
import Components from '@/components/components'

export default async function Home() {
    // const dict = await getDictionary()

    return (
        <main className="flex flex-1 flex-col gap-2 p-6">
            {/* {dict.page.home.description} */}
            <ThemeToggle />
            <Components />
        </main>
    )
}
