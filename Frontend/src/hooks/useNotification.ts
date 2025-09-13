import { notification } from "antd";

export type NotificationType = "success" | "info" | "warning" | "error";

type PropType = {
  type: NotificationType;
  message: string;
  description?: string;
  onClose?: () => void;
  key?: string;
};

type FunctionPropType = {
  openNotificationWithIcon: (props: PropType) => void;
  contextHolder: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >;
  destroy: (key?: string) => void;
};

const useNotification = (): FunctionPropType => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = ({
    key,
    type,
    message,
    description,
    onClose,
  }: PropType): void => {
    api[type]({ key, message, description, onClose });
  };

  return {
    openNotificationWithIcon,
    contextHolder,
    destroy: notification.destroy,
  };
};

export default useNotification;
