import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">João Silva adicionou 5 unidades de Notebook Dell Inspiron</p>
          <p className="text-sm text-muted-foreground">Hoje às 09:15</p>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Entrada
          </Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>MO</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Maria Oliveira removeu 2 unidades de Monitor LG 24&quot;</p>
          <p className="text-sm text-muted-foreground">Hoje às 08:30</p>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Saída
          </Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Carlos Santos adicionou 10 unidades de Teclado Mecânico Logitech
          </p>
          <p className="text-sm text-muted-foreground">Hoje às 08:15</p>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Entrada
          </Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ana Pereira removeu 3 unidades de Mouse Sem Fio Microsoft</p>
          <p className="text-sm text-muted-foreground">Ontem às 16:45</p>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Saída
          </Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pedro Costa removeu 1 unidade de Cadeira Gamer ThunderX</p>
          <p className="text-sm text-muted-foreground">Ontem às 14:20</p>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Saída
          </Badge>
        </div>
      </div>
    </div>
  )
}
