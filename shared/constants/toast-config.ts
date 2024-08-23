import toast from "react-hot-toast";

export const toastConfig = [
    { key: 'paid', fn: toast.success, message: 'Замовлення успішно оплачено! Інформація була відправлена на пошту.' },
    { key: 'unpaid', fn: toast.error, message: 'Замовлення не було оплачено! Спробуйте оплатити знову.' },
    { key: 'verified', fn: toast.success, message: 'Пошта була успішно підтверджена!' }
];