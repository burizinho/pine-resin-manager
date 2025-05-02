
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DollarSign, Download, Plus, TrendingDown, TrendingUp } from "lucide-react";

export default function FinancesPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finanças</h1>
          <p className="text-muted-foreground">
            Acompanhe receitas, despesas e resultados financeiros
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Download size={18} />
            <span>Exportar</span>
          </Button>
          <Button className="gap-1">
            <Plus size={18} />
            <span>Nova Transação</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 138.500,00</div>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12% em relação ao ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 52.430,00</div>
            <div className="flex items-center mt-1 text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>+8% em relação ao ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 86.070,00</div>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+15% em relação ao ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Preço Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 56,53/kg</div>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+5% em relação ao ano anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transacoes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="previsoes">Previsões</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
              <CardDescription>Últimas 10 transações registradas no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Descrição</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Categoria</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Valor</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { desc: "Venda de resina - Lote A", cat: "Vendas", val: 12350, type: "receita" },
                      { desc: "Manutenção equipamentos", cat: "Operacional", val: -1850, type: "despesa" },
                      { desc: "Venda de resina - Lote B", cat: "Vendas", val: 15600, type: "receita" },
                      { desc: "Salários - Maio", cat: "Pessoal", val: -8500, type: "despesa" },
                      { desc: "Combustível", cat: "Operacional", val: -1200, type: "despesa" },
                      { desc: "Venda de resina - Lote C", cat: "Vendas", val: 18900, type: "receita" },
                      { desc: "Insumos", cat: "Materiais", val: -3450, type: "despesa" },
                      { desc: "Consultoria técnica", cat: "Serviços", val: -2800, type: "despesa" },
                      { desc: "Venda de resina - Lote D", cat: "Vendas", val: 14750, type: "receita" },
                      { desc: "Manutenção de veículos", cat: "Operacional", val: -1350, type: "despesa" }
                    ].map((item, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-4 align-middle">{`${5 - Math.floor(i/2)}/05/2025`}</td>
                        <td className="p-4 align-middle">{item.desc}</td>
                        <td className="p-4 align-middle">{item.cat}</td>
                        <td className={`p-4 align-middle text-right font-medium ${
                          item.val > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {`R$ ${Math.abs(item.val).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`}
                        </td>
                        <td className="p-4 align-middle">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.type === "receita" 
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {item.type === "receita" ? "Receita" : "Despesa"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="relatorios" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Receitas x Despesas</CardTitle>
                <CardDescription>Comparativo dos últimos 12 meses</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">
                    Gráfico de receitas vs despesas por mês
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Despesas</CardTitle>
                <CardDescription>Por categoria</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">
                    Gráfico de pizza com distribuição de despesas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="previsoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projeção Financeira</CardTitle>
              <CardDescription>Previsão para os próximos 12 meses</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">
                  Gráfico de projeção financeira para os próximos meses
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
