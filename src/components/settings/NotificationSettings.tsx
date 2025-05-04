
import { useNotifications } from '@/contexts/NotificationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function NotificationSettings() {
  const { clearNotifications } = useNotifications();
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    financial: true,
    extraction: true,
    marketing: false,
    maintenance: true
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    // Em uma aplicação real, salvaríamos estas configurações no backend
    // Por enquanto, apenas salvamos no localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
    
    // Adicionaria uma notificação de confirmação
    // addNotification({
    //   title: 'Configurações Salvas',
    //   message: 'Suas preferências de notificação foram atualizadas com sucesso.',
    //   type: 'success'
    // });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferências de Notificações</CardTitle>
        <CardDescription>
          Configure como e quando deseja receber notificações do sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Canais de Notificação</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notif" className="font-medium">
                  Notificações por Email
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações importantes por email
                </p>
              </div>
              <Switch
                id="email-notif"
                checked={settings.email}
                onCheckedChange={() => handleToggle('email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notif" className="font-medium">
                  Notificações no navegador
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receba alertas em tempo real no sistema
                </p>
              </div>
              <Switch
                id="push-notif"
                checked={settings.push}
                onCheckedChange={() => handleToggle('push')}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Tipos de Notificações</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="finance-notif" className="font-medium">
                  Alertas Financeiros
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notificações sobre transações e relatórios financeiros
                </p>
              </div>
              <Switch
                id="finance-notif"
                checked={settings.financial}
                onCheckedChange={() => handleToggle('financial')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="extraction-notif" className="font-medium">
                  Alertas de Extração
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notificações sobre atividades de extração e colheita
                </p>
              </div>
              <Switch
                id="extraction-notif"
                checked={settings.extraction}
                onCheckedChange={() => handleToggle('extraction')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-notif" className="font-medium">
                  Marketing e Promoções
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receba informações sobre novos recursos e ofertas
                </p>
              </div>
              <Switch
                id="marketing-notif"
                checked={settings.marketing}
                onCheckedChange={() => handleToggle('marketing')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance-notif" className="font-medium">
                  Manutenção do Sistema
                </Label>
                <p className="text-sm text-muted-foreground">
                  Alertas sobre atualizações e manutenções programadas
                </p>
              </div>
              <Switch
                id="maintenance-notif"
                checked={settings.maintenance}
                onCheckedChange={() => handleToggle('maintenance')}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button variant="destructive" onClick={clearNotifications}>
            Limpar Histórico de Notificações
          </Button>
          <Button onClick={handleSave}>Salvar Preferências</Button>
        </div>
      </CardContent>
    </Card>
  );
}
