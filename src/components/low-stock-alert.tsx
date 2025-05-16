import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function LowStockAlert() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Teclado Mecânico Logitech</p>
            <p className="text-xs text-muted-foreground">3 unidades restantes</p>
          </div>
          <Button variant="outline" size="sm">
            Repor
          </Button>
        </div>
        <Progress value={15} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Headset Gamer HyperX</p>
            <p className="text-xs text-muted-foreground">4 unidades restantes</p>
          </div>
          <Button variant="outline" size="sm">
            Repor
          </Button>
        </div>
        <Progress value={20} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Webcam Logitech C920</p>
            <p className="text-xs text-muted-foreground">2 unidades restantes</p>
          </div>
          <Button variant="outline" size="sm">
            Repor
          </Button>
        </div>
        <Progress value={10} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Cadeira Gamer ThunderX</p>
            <p className="text-xs text-muted-foreground">0 unidades restantes</p>
          </div>
          <Button variant="outline" size="sm">
            Repor
          </Button>
        </div>
        <Progress value={0} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Mousepad XL Gaming</p>
            <p className="text-xs text-muted-foreground">5 unidades restantes</p>
          </div>
          <Button variant="outline" size="sm">
            Repor
          </Button>
        </div>
        <Progress value={25} className="h-2" />
      </div>
    </div>
  )
}
