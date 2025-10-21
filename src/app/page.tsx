import { getDictionary } from '@/lib/dictionary'
import { ThemeToggle } from '@/components/theme-toggle'
import Components from '@/components/components'
import { ProductThemeSwitcher } from '@/components/ui/product-toggle'
import { Card } from '@/components/ui/card'
export default async function Home() {
    const dict = await getDictionary()

    return (
        <Card>
            <div className="flex gap-2">
                <ThemeToggle />
                <ProductThemeSwitcher dict={dict} />
            </div>
            <Components />
        </Card>
    )
}
