import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { translations, type Language } from "@/lib/translations"
import { BarChart3, Users, BookOpen, FileText } from "lucide-react"

export default function AdminPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]

  const stats = [
    {
      title: t.admin.stats.articles,
      value: "124",
      icon: FileText,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: t.admin.stats.journals,
      value: "45",
      icon: BookOpen,
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: t.admin.stats.authors,
      value: "289",
      icon: Users,
      trend: "+24.3%",
      trendUp: true,
    },
    {
      title: t.admin.stats.resources,
      value: "67",
      icon: BarChart3,
      trend: "+4.1%",
      trendUp: true,
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold sm:text-3xl">{t.admin.dashboard}</h1>
        <p className="text-sm text-muted-foreground sm:text-base">Overview of your scientific publishing platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6">
        {/* Top Row - Larger Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className="rounded-full bg-primary/10 p-2.5 sm:p-3">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{stat.value}</div>
                    <div
                      className={`text-xs sm:text-sm ${stat.trendUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {stat.trend} from last month
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom Row - Activity Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Recent Articles */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Recent Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none sm:text-base">New article submitted</p>
                      <p className="text-xs text-muted-foreground sm:text-sm">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Author Activity */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Author Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none sm:text-base">New author registered</p>
                      <p className="text-xs text-muted-foreground sm:text-sm">5 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

