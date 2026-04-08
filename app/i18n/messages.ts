import type { AppLocale } from '../../i18n/config';

import en from '../../i18n/locales/en.json';
import uk from '../../i18n/locales/uk.json';
import es from '../../i18n/locales/es.json';
import fr from '../../i18n/locales/fr.json';
import de from '../../i18n/locales/de.json';
import it from '../../i18n/locales/it.json';
import pt from '../../i18n/locales/pt.json';
import pl from '../../i18n/locales/pl.json';
import tr from '../../i18n/locales/tr.json';
import nl from '../../i18n/locales/nl.json';
import sv from '../../i18n/locales/sv.json';
import cs from '../../i18n/locales/cs.json';
import ro from '../../i18n/locales/ro.json';
import hu from '../../i18n/locales/hu.json';
import el from '../../i18n/locales/el.json';
import he from '../../i18n/locales/he.json';
import ar from '../../i18n/locales/ar.json';
import hi from '../../i18n/locales/hi.json';
import id from '../../i18n/locales/id.json';
import ja from '../../i18n/locales/ja.json';
import ko from '../../i18n/locales/ko.json';
import zh from '../../i18n/locales/zh.json';

type Messages = Record<string, string>;

const localeMessages: Record<AppLocale, Messages> = {
	en,
	uk,
	es,
	fr,
	de,
	it,
	pt,
	pl,
	tr,
	nl,
	sv,
	cs,
	ro,
	hu,
	el,
	he,
	ar,
	hi,
	id,
	ja,
	ko,
	zh,
};

export function getMessages(locale: AppLocale): Messages {
	return localeMessages[locale] ?? en;
}

