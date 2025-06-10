//components/recent-activity.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface RecentActivityProps {
  activities: {
    _id: string
    type: string
    product: {
      _id: string
      name: string
    }
    quantity: number
    date: string
    responsibleUser?: {
      _id: string
      name: string
    }
  }[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="space-y-8">
      {activities.length === 0 ? (
        <p className="text-sm text-muted-foreground">Não há atividades recentes.</p>
      ) : (
        activities.map((activity) => {
          const date = new Date(activity.date)
          const formattedDate = date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })

         const getActivityDescription = () => {
  const productName = activity.product?.name || "produto desconhecido"

  switch (activity.type) {
    case "Entrada":
      return `adicionou ${activity.quantity} unidades de ${productName} ao estoque`
    case "Saída":
      return `removeu ${activity.quantity} unidades de ${productName} do estoque`
    case "Ajuste":
      return `ajustou o estoque de ${productName} em ${activity.quantity} unidades`
    default:
      return `movimentou ${activity.quantity} unidades de ${productName}`
  }
}


          const getInitials = (name: string) => {
            return name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .substring(0, 2)
          }

          return (
            <div key={activity._id} className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border">
                <AvatarFallback>
                  {activity.responsibleUser ? getInitials(activity.responsibleUser.name) : "US"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium leading-none">
                  {activity.responsibleUser ? activity.responsibleUser.name : "Usuário do Sistema"}
                </p>
                <p className="text-sm text-muted-foreground">{getActivityDescription()}</p>
                <p className="text-xs text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
