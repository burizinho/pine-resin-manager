
import { useNotifications } from '@/contexts/NotificationContext';

export function useDemoNotifications() {
  const { addNotification } = useNotifications();

  const addDemoNotifications = () => {
    // Adiciona exemplos de notificações para demonstração
    addNotification({
      title: 'Extração Agendada',
      message: 'Nova extração agendada para Área 3 em 25/05/2025',
      type: 'info'
    });

    setTimeout(() => {
      addNotification({
        title: 'Alerta de Produtividade',
        message: 'A produção da Área 7 está 15% abaixo do esperado',
        type: 'warning'
      });
    }, 2000);

    setTimeout(() => {
      addNotification({
        title: 'Pagamento Recebido',
        message: 'Pagamento de R$ 32.450,00 confirmado',
        type: 'success'
      });
    }, 4000);
  };

  return { addDemoNotifications };
}
