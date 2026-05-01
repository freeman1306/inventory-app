import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	ru: {
		translation: {
			'inventory': 'ИНВЕНТАРИЗАЦИЯ',
			'orders': 'ПРИХОДЫ',
			'products': 'ПРОДУКТЫ',
			'groups': 'ГРУППЫ',
			'users': 'ПОЛЬЗОВАТЕЛИ',
			'settings': 'НАСТРОЙКИ',
			'delete': 'УДАЛИТЬ',
			'cancel': 'ОТМЕНИТЬ',
			'confirm_delete': 'Вы уверены, что хотите удалить?',
			'active_sessions': 'Активных сессий',
			'products_count': 'Продуктов',
			'search': 'Поиск',
			'filter_by_type': 'Фильтр по типу'
		}
	},
	en: {
		translation: {
			'inventory': 'INVENTORY',
			'orders': 'RECEIPTS',
			'products': 'PRODUCTS',
			'groups': 'GROUPS',
			'users': 'USERS',
			'settings': 'SETTINGS',
			'delete': 'DELETE',
			'cancel': 'CANCEL',
			'confirm_delete': 'Are you sure you want to delete?',
			'active_sessions': 'Active sessions',
			'products_count': 'Products',
			'search': 'Search',
			'filter_by_type': 'Filter by type'
		}
	}
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'ru',
	fallbackLng: 'ru',
	interpolation: {
		escapeValue: false
	}
});

export default i18n;