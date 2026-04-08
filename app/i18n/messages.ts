import type { AppLocale } from '../../i18n/config';

import en from '../../i18n/locales/en.json';
import uk from '../../i18n/locales/uk.json';
import de from '../../i18n/locales/de.json';
import it from '../../i18n/locales/it.json';
import es from '../../i18n/locales/es.json';
import fr from '../../i18n/locales/fr.json';

type Messages = Record<string, string>;

const localeMessages: Record<AppLocale, Messages> = {
	en,
	uk,
	de,
	es,
	fr,
	it,
};

export function getMessages(locale: AppLocale): Messages {
	return localeMessages[locale] ?? en;
}

