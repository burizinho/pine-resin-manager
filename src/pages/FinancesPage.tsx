
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import RevenueExpenseChart from "@/components/finances/RevenueExpenseChart";
import ExpensesPieChart from "@/components/finances/ExpensesPieChart";
import ForecastChart from "@/components/finances/ForecastChart";
import FinancialKpis from "@/components/finances/FinancialKpis";
import { TransactionDialog } from "@/components/finances/TransactionDialog";
import { TransactionFilters } from "@/components/finances/TransactionFilters";
import { TransactionsTable } from "@/components/finances/TransactionsTable";
import { DeleteTransactionDialog } from "@/components/finances/DeleteTransactionDialog";
import { Transaction } from "@/types";

// Sample transaction data
const sampleTransactions: Transaction[] = [
  { id: "1", type: "receita", description: "Venda de resina - Lote A", category: "Vendas", amount: 12350, date: "2025-05-05", createdAt: "2025-05-05" },
  { id: "2", type: "despesa", description: "Manutenção equipamentos", category: "Manutenção", amount: -1850, date: "2025-05-05", createdAt: "2025-05-05" },
  { id: "3", type: "receita", description: "Venda de resina - Lote B", category: "Vendas", amount: 15600, date: "2025-05-04", createdAt: "2025-05-04" },
  { id: "4", type: "despesa", description: "Salários - Maio", category: "Pessoal", amount: -8500, date: "2025-05-04", createdAt: "2025-05-04" },
  { id: "5", type: "despesa", description: "Combustível", category: "Operacional", amount: -1200, date: "2025-05-03", createdAt: "2025-05-03" },
  { id: "6", type: "receita", description: "Venda de resina - Lote C", category: "Vendas", amount: 18900, date: "2025-05-03", createdAt: "2025-05-03" },
  { id: "7", type: "despesa", description: "Insumos", category: "Materiais", amount: -3450, date: "2025-05-02", createdAt: "2025-05-02" },
  { id: "8", type: "despesa", description: "Consultoria técnica", category: "Serviços", amount: -2800, date: "2025-05-02", createdAt: "2025-05-02" },
  { id: "9", type: "receita", description: "Venda de resina - Lote D", category: "Vendas", amount: 14750, date: "2025-05-01", createdAt: "2025-05-01" },
  { id: "10", type: "despesa", description: "Manutenção de veículos", category: "Operacional", amount: -1350, date: "2025-05-01", createdAt: "2025-05-01" }
];

export default function FinancesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(sampleTransactions);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

  const handleFilterChange = (filters: any) => {
    let filtered = [...transactions];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        t => 
          t.description.toLowerCase().includes(searchLower) || 
          t.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }
    
    // Apply date range filter
    if (filters.dateRange.from) {
      const fromDate = new Date(filters.dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(t => new Date(t.date) >= fromDate);
    }
    
    if (filters.dateRange.to) {
      const toDate = new Date(filters.dateRange.to);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(t => new Date(t.date) <= toDate);
    }
    
    // Apply amount filters
    if (filters.minAmount !== undefined) {
      filtered = filtered.filter(t => Math.abs(t.amount) >= filters.minAmount);
    }
    
    if (filters.maxAmount !== undefined) {
      filtered = filtered.filter(t => Math.abs(t.amount) <= filters.maxAmount);
    }
    
    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = () => {
    setCurrentTransaction(null);
    setIsAddingTransaction(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsAddingTransaction(true);
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (transactionToDelete) {
      const updatedTransactions = transactions.filter(t => t.id !== transactionToDelete.id);
      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
      toast.success("Transação excluída com sucesso");
    }
    setIsDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  const handleSaveTransaction = (data: Partial<Transaction>) => {
    const now = new Date().toISOString();
    
    if (currentTransaction) {
      // Update existing transaction
      const updatedTransactions = transactions.map(t => 
        t.id === currentTransaction.id 
          ? { ...t, ...data, date: new Date(data.date as string).toISOString() } 
          : t
      );
      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
      toast.success("Transação atualizada com sucesso");
    } else {
      // Create new transaction
      const newTransaction: Transaction = {
        id: uuidv4(),
        type: data.type as 'receita' | 'despesa',
        description: data.description || '',
        category: data.category || '',
        amount: data.amount || 0,
        date: new Date(data.date as string).toISOString(),
        notes: data.notes,
        createdAt: now,
      };
      
      const updatedTransactions = [...transactions, newTransaction];
      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
      toast.success("Transação adicionada com sucesso");
    }
  };

  const handleExport = () => {
    toast.success("Exportação iniciada. O arquivo será baixado em breve.");
    // In a real application, this would trigger an actual export process
  };

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
          <Button variant="outline" className="gap-1" onClick={handleExport}>
            <Download size={18} />
            <span>Exportar</span>
          </Button>
          <Button className="gap-1" onClick={handleAddTransaction}>
            <Plus size={18} />
            <span>Nova Transação</span>
          </Button>
        </div>
      </div>

      <FinancialKpis />

      <Tabs defaultValue="transacoes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="previsoes">Previsões</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transacoes" className="space-y-4">
          <TransactionFilters onFilterChange={handleFilterChange} />
          
          <Card>
            <CardHeader>
              <CardTitle>Transações</CardTitle>
              <CardDescription>Gerencie suas receitas e despesas</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionsTable 
                transactions={filteredTransactions}
                onEditTransaction={handleEditTransaction}
                onDeleteTransaction={handleDeleteTransaction}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="relatorios" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <RevenueExpenseChart />
            <ExpensesPieChart />
          </div>
        </TabsContent>
        
        <TabsContent value="previsoes" className="space-y-4">
          <ForecastChart />
        </TabsContent>
      </Tabs>
      
      {/* Transaction Dialog */}
      <TransactionDialog 
        open={isAddingTransaction} 
        onOpenChange={setIsAddingTransaction}
        transaction={currentTransaction}
        onSave={handleSaveTransaction}
      />
      
      {/* Delete Transaction Dialog */}
      <DeleteTransactionDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        transaction={transactionToDelete}
        onConfirm={handleConfirmDelete}
      />
    </MainLayout>
  );
}
