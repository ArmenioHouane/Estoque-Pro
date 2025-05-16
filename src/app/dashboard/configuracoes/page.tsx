import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function ConfiguracoesPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Configurações</h1>

      <Tabs defaultValue="empresa" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>
        <TabsContent value="empresa">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
              <CardDescription>Configure as informações da sua empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome-empresa">Nome da Empresa</Label>
                    <Input id="nome-empresa" defaultValue="Minha Empresa Ltda." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj-empresa">CNPJ</Label>
                    <Input id="cnpj-empresa" defaultValue="12.345.678/0001-90" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-empresa">E-mail</Label>
                    <Input id="email-empresa" type="email" defaultValue="contato@minhaempresa.com.br" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone-empresa">Telefone</Label>
                    <Input id="telefone-empresa" defaultValue="(11) 3456-7890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-empresa">Site</Label>
                    <Input id="site-empresa" defaultValue="www.minhaempresa.com.br" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-empresa">Logo da Empresa</Label>
                    <Input id="logo-empresa" type="file" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Endereço</Label>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cep-empresa">CEP</Label>
                      <Input id="cep-empresa" defaultValue="01234-567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logradouro-empresa">Logradouro</Label>
                      <Input id="logradouro-empresa" defaultValue="Av. Paulista" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero-empresa">Número</Label>
                      <Input id="numero-empresa" defaultValue="1000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="complemento-empresa">Complemento</Label>
                      <Input id="complemento-empresa" defaultValue="Sala 101" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bairro-empresa">Bairro</Label>
                      <Input id="bairro-empresa" defaultValue="Bela Vista" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cidade-empresa">Cidade</Label>
                      <Input id="cidade-empresa" defaultValue="São Paulo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado-empresa">Estado</Label>
                      <Select defaultValue="sp">
                        <SelectTrigger id="estado-empresa">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sp">São Paulo</SelectItem>
                          <SelectItem value="rj">Rio de Janeiro</SelectItem>
                          <SelectItem value="mg">Minas Gerais</SelectItem>
                          <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                          <SelectItem value="pr">Paraná</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pais-empresa">País</Label>
                      <Input id="pais-empresa" defaultValue="Brasil" />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
              <CardDescription>Gerencie os usuários que têm acesso ao sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button>
                    <span className="mr-2">+</span>
                    Adicionar Usuário
                  </Button>
                </div>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Nome</th>
                        <th className="p-3 text-left font-medium">E-mail</th>
                        <th className="p-3 text-left font-medium">Perfil</th>
                        <th className="p-3 text-left font-medium">Status</th>
                        <th className="p-3 text-right font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">João Silva</td>
                        <td className="p-3">joao.silva@empresa.com.br</td>
                        <td className="p-3">Administrador</td>
                        <td className="p-3">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Ativo
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Maria Oliveira</td>
                        <td className="p-3">maria.oliveira@empresa.com.br</td>
                        <td className="p-3">Gerente</td>
                        <td className="p-3">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Ativo
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Carlos Santos</td>
                        <td className="p-3">carlos.santos@empresa.com.br</td>
                        <td className="p-3">Operador</td>
                        <td className="p-3">
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Inativo
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button>Gerenciar Perfis de Acesso</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Defina como e quando deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Alertas de Estoque</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Estoque Baixo</div>
                      <div className="text-sm text-muted-foreground">
                        Receba notificações quando produtos atingirem o estoque mínimo
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Sem Estoque</div>
                      <div className="text-sm text-muted-foreground">
                        Receba notificações quando produtos ficarem sem estoque
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Pedidos</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Novos Pedidos</div>
                      <div className="text-sm text-muted-foreground">
                        Receba notificações quando novos pedidos forem criados
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Alterações de Status</div>
                      <div className="text-sm text-muted-foreground">
                        Receba notificações quando o status de um pedido for alterado
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Canais de Notificação</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">E-mail</div>
                      <div className="text-sm text-muted-foreground">Receba notificações por e-mail</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Sistema</div>
                      <div className="text-sm text-muted-foreground">Receba notificações dentro do sistema</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="sistema">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>Personalize as configurações gerais do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Aparência</h3>
                  <div className="space-y-2">
                    <Label htmlFor="tema">Tema</Label>
                    <Select defaultValue="claro">
                      <SelectTrigger id="tema">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="claro">Claro</SelectItem>
                        <SelectItem value="escuro">Escuro</SelectItem>
                        <SelectItem value="sistema">Seguir Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Estoque</h3>
                  <div className="space-y-2">
                    <Label htmlFor="estoque-minimo-padrao">Estoque Mínimo Padrão</Label>
                    <Input id="estoque-minimo-padrao" type="number" defaultValue="5" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Permitir Estoque Negativo</div>
                      <div className="text-sm text-muted-foreground">
                        Permite que o estoque fique negativo em caso de saídas
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Backup</h3>
                  <div className="space-y-2">
                    <Label htmlFor="frequencia-backup">Frequência de Backup</Label>
                    <Select defaultValue="diario">
                      <SelectTrigger id="frequencia-backup">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diario">Diário</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-start">
                    <Button variant="outline">Fazer Backup Manual</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
