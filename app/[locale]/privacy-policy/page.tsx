import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../components/Header'
import { Shield, Mail, ExternalLink, AlertCircle } from 'lucide-react'
import { defaultLocale, isSupportedLocale, normalizeLocale, type AppLocale } from '../../../i18n/config'
import { getMessages } from '../../i18n/messages'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale
  const messages = getMessages(locale)
  const t = (key: string) => messages[key] ?? key
  return {
    title: t('privacy.title') + ' | EditoraPDF',
    description: t('privacy.desc'),
  }
}

type Section = { heading: string; content?: string; items?: string[]; subsections?: { heading: string; content: string; items?: string[] }[] }

type PrivacyContent = {
  title: string
  updated: string
  priorityTitle: string
  priorityDesc: string
  disclaimer: string
  sections: Section[]
  contactTitle: string
  contactEmail: string
  contactPage: string
  copyright: string
  termsLink: string
  contactLink: string
}

const privacyContent: Record<AppLocale, PrivacyContent> = {
  en: {
    title: 'Privacy Policy', updated: 'Last updated: January 30, 2026',
    priorityTitle: 'Your Privacy is Our Priority',
    priorityDesc: 'EditoraPDF processes all PDFs entirely in your browser. Your files never leave your device and are never uploaded to our servers.',
    disclaimer: 'Important: the service is provided for general use. Please always verify documents after editing before official use or submission.',
    sections: [
      { heading: '1. Information We Collect', subsections: [
        { heading: '1.1 Personal Information', content: 'We do not require registration, account creation, or submission of personal data to use the core EditoraPDF tools.' },
        { heading: '1.2 Your PDF Documents', content: 'Your PDF files are not uploaded to our servers. All processing occurs locally in the browser using JavaScript.', items: ['File is read directly from your device', 'Editing is performed in browser memory', 'Document is saved only when you click "Export"', 'File contents are not transmitted to our servers', 'We cannot view, read, or store your PDFs'] },
        { heading: '1.3 Technical Information', content: 'When you visit the site, technical information that does not directly identify you may be collected automatically:', items: ['Browser information: type, version, language settings', 'Device information: device type, OS, screen resolution', 'Usage data: pages viewed, time on site, navigation actions', 'IP address: may be used for security and analytics in anonymized form'] },
        { heading: '1.4 Cookies and Similar Technologies', content: 'We may use cookies for proper site operation, language preference storage, and analytics.', items: ['Essential cookies: required for basic site operation', 'Preference cookies: remember language and settings', 'Analytics cookies: help understand site usage', 'Advertising cookies: may be used to show relevant ads'] },
      ]},
      { heading: '2. How We Use Information', content: 'The limited technical data we collect is used for:', items: ['Improving the service and interface', 'Analyzing stability and performance', 'Protecting against abuse and fraud', 'Saving your local settings', 'Evaluating site and advertising integration effectiveness'] },
      { heading: '3. Third-Party Services and Advertising', subsections: [
        { heading: '3.1 Google AdSense', content: 'The site may use Google AdSense to display advertising. Google may apply cookies and other technologies to personalize ads, measure effectiveness, and protect against fraud.' },
        { heading: '3.2 Analytics', content: 'We may use analytics tools to understand user behavior on the site: which pages are viewed, how long sessions last, and what devices visitors use.' },
        { heading: '3.3 Other Third-Party Services', content: 'We may also use third-party infrastructure for hosting, content delivery, and site protection. These services have their own privacy policies.' },
      ]},
      { heading: '4. Data Storage and Security', subsections: [
        { heading: '4.1 Local Storage', content: 'Your browser may store local settings, resource cache, and temporary interface state for faster site operation.', items: ['Zoom level and individual interface settings', 'Language preferences', 'Cached application resources', 'Temporary state of current editing session'] },
        { heading: '4.2 Server Storage', content: 'We do not store PDF files on servers. Only anonymized analytics data, error logs, and security logs may be stored as needed.' },
        { heading: '4.3 Security', content: 'Since documents are not uploaded to the server, there is no risk of PDF compromise through a server data breach. We additionally use HTTPS and basic site security measures.' },
      ]},
      { heading: '5. Data Retention', items: ['Analytics data: may be stored in aggregate form for up to 26 months', 'Error logs: up to 90 days for issue diagnosis', 'Security logs: up to 12 months to prevent abuse', 'Local storage: stored in your browser until you clear the data'] },
      { heading: '6. Your Rights and Choices', content: 'Depending on your country of residence, you may have the right to access information about data processing, restrict such processing, delete certain data, or opt out of personalized advertising. For privacy inquiries, contact us at hello@editorapdf.com.' },
      { heading: '7. Cookies and Advertising Settings', content: 'You can manage cookies through your browser settings. Disabling certain cookies may affect some site functionality, but the core local PDF processing will continue to work.' },
      { heading: '8. Children\'s Privacy', content: 'The service is not specifically designed for children under 13. We do not knowingly collect personal data from children.' },
      { heading: '9. International Users', content: 'EditoraPDF is available in various countries. Your PDF files are not transferred between countries as they are processed locally in the browser. However, third-party analytics or advertising services may process technical data outside your jurisdiction according to their own policies.' },
      { heading: '10. Changes to This Policy', content: 'We may periodically update this privacy policy due to changes in technology, law, or service operation. The current version is always published on this page.' },
      { heading: '11. Contact', content: '' },
    ],
    contactTitle: 'Email:', contactEmail: 'hello@editorapdf.com', contactPage: 'Contact page:',
    copyright: '© 2026 EditoraPDF. Your privacy matters.', termsLink: 'Terms of Service', contactLink: 'Contact',
  },
  uk: {
    title: 'Політика конфіденційності', updated: 'Останнє оновлення: 30 січня 2026',
    priorityTitle: 'Ваша приватність для нас пріоритет',
    priorityDesc: 'EditoraPDF обробляє PDF повністю у вашому браузері. Ваші файли не залишають пристрій і не завантажуються на наші сервери.',
    disclaimer: 'Важливо: сервіс надається для загального використання. Будь ласка, завжди перевіряйте документи після редагування перед офіційним використанням або відправкою.',
    sections: [
      { heading: '1. Які дані ми збираємо', subsections: [
        { heading: '1.1 Особисті дані', content: 'Ми не вимагаємо реєстрації, створення акаунта чи передачі персональних даних для роботи з основними інструментами EditoraPDF.' },
        { heading: '1.2 Ваші PDF-документи', content: 'Ваші PDF-файли не завантажуються на наші сервери. Уся обробка відбувається локально у браузері за допомогою JavaScript.', items: ['Файл читається безпосередньо з вашого пристрою', 'Редагування виконується в пам\'яті браузера', 'Документ зберігається лише коли ви самі натискаєте «Експорт»', 'Вміст файлів не передається на наші сервери', 'Ми не можемо переглядати, читати чи зберігати ваші PDF'] },
        { heading: '1.3 Технічна інформація', content: 'Під час відвідування сайту може автоматично збиратися технічна інформація, яка не ідентифікує вас напряму:', items: ['Інформація про браузер: тип, версія, мовні налаштування', 'Інформація про пристрій: тип пристрою, операційна система, роздільна здатність екрана', 'Дані використання: переглянуті сторінки, час на сайті, навігаційні дії', 'IP-адреса: може використовуватись для безпеки й аналітики в анонімізованому вигляді'] },
        { heading: '1.4 Cookies та схожі технології', content: 'Ми можемо використовувати cookies для правильної роботи сайту, збереження налаштувань мови й аналітики.', items: ['Обов\'язкові cookies: потрібні для базової роботи сайту', 'Cookies налаштувань: запам\'ятовують мову та окремі параметри', 'Аналітичні cookies: допомагають зрозуміти використання сайту', 'Рекламні cookies: можуть використовуватись для показу релевантної реклами'] },
      ]},
      { heading: '2. Як ми використовуємо інформацію', content: 'Обмежений обсяг технічних даних використовується для:', items: ['покращення сервісу та інтерфейсу', 'аналізу стабільності і продуктивності', 'захисту від зловживань і шахрайства', 'збереження ваших локальних налаштувань', 'оцінки ефективності сайту та рекламних інтеграцій'] },
      { heading: '3. Сторонні сервіси та реклама', subsections: [
        { heading: '3.1 Google AdSense', content: 'На сайті може використовуватись Google AdSense для показу реклами. Google може застосовувати cookies та інші технології для персоналізації реклами, вимірювання її ефективності і захисту від шахрайства.' },
        { heading: '3.2 Аналітика', content: 'Ми можемо використовувати інструменти аналітики для розуміння поведінки користувачів на сайті: які сторінки переглядаються, скільки часу триває сесія, з яких пристроїв заходять відвідувачі.' },
        { heading: '3.3 Інші сторонні сервіси', content: 'Ми також можемо використовувати сторонню інфраструктуру для хостингу, доставки контенту та захисту сайту. Ці сервіси мають власні політики конфіденційності.' },
      ]},
      { heading: '4. Зберігання даних і безпека', subsections: [
        { heading: '4.1 Локальне зберігання', content: 'Ваш браузер може зберігати локальні налаштування, кеш ресурсів і тимчасовий стан інтерфейсу для швидшої роботи сайту.', items: ['рівень масштабування та окремі налаштування інтерфейсу', 'мовні параметри', 'кешовані ресурси застосунку', 'тимчасовий стан поточного редагування'] },
        { heading: '4.2 Серверне зберігання', content: 'Ми не зберігаємо PDF-файли на серверах. За потреби можуть зберігатися лише анонімізовані аналітичні дані, журнали помилок і журнали безпеки.' },
        { heading: '4.3 Безпека', content: 'Оскільки документи не завантажуються на сервер, немає ризику компрометації PDF через серверний витік даних. Додатково ми використовуємо HTTPS та базові заходи безпеки сайту.' },
      ]},
      { heading: '5. Термін зберігання даних', items: ['Аналітичні дані: можуть зберігатися в агрегованому вигляді до 26 місяців', 'Логи помилок: до 90 днів для діагностики проблем', 'Логи безпеки: до 12 місяців для запобігання зловживанням', 'Локальне сховище: зберігається у вашому браузері, доки ви самі не очистите дані'] },
      { heading: '6. Ваші права та вибір', content: 'Залежно від країни проживання ви можете мати право на доступ до інформації про обробку даних, обмеження такої обробки, видалення окремих даних або відмову від персоналізованої реклами. Для запитів щодо конфіденційності звертайтесь на hello@editorapdf.com.' },
      { heading: '7. Cookies та рекламні налаштування', content: 'Ви можете керувати cookies через налаштування браузера. Вимкнення окремих cookies може вплинути на частину функціональності сайту, але основна локальна обробка PDF продовжить працювати.' },
      { heading: '8. Конфіденційність дітей', content: 'Сервіс не призначений спеціально для дітей молодше 13 років. Ми свідомо не збираємо персональні дані дітей.' },
      { heading: '9. Міжнародні користувачі', content: 'EditoraPDF доступний у різних країнах. Ваші PDF-файли не передаються між країнами, бо обробляються локально у браузері. Водночас сторонні аналітичні чи рекламні сервіси можуть обробляти технічні дані за межами вашої юрисдикції відповідно до власних політик.' },
      { heading: '10. Зміни до цієї політики', content: 'Ми можемо періодично оновлювати цю політику конфіденційності через зміни в технологіях, законодавстві або в роботі сервісу. Актуальна версія завжди розміщується на цій сторінці.' },
      { heading: '11. Контакти', content: '' },
    ],
    contactTitle: 'Електронна пошта:', contactEmail: 'hello@editorapdf.com', contactPage: 'Сторінка контактів:',
    copyright: '© 2026 EditoraPDF. Ваша приватність має значення.', termsLink: 'Умови використання', contactLink: 'Контакти',
  },
  de: {
    title: 'Datenschutzrichtlinie', updated: 'Zuletzt aktualisiert: 30. Januar 2026',
    priorityTitle: 'Ihre Privatsphäre hat für uns Priorität',
    priorityDesc: 'EditoraPDF verarbeitet alle PDFs vollständig in Ihrem Browser. Ihre Dateien verlassen nie Ihr Gerät und werden nie auf unsere Server hochgeladen.',
    disclaimer: 'Wichtig: Der Dienst wird für den allgemeinen Gebrauch bereitgestellt. Bitte überprüfen Sie Dokumente nach der Bearbeitung immer vor der offiziellen Verwendung oder Einreichung.',
    sections: [
      { heading: '1. Informationen, die wir sammeln', subsections: [
        { heading: '1.1 Persönliche Informationen', content: 'Wir verlangen keine Registrierung, Kontoerstellung oder Übermittlung persönlicher Daten zur Nutzung der Kernfunktionen von EditoraPDF.' },
        { heading: '1.2 Ihre PDF-Dokumente', content: 'Ihre PDF-Dateien werden nicht auf unsere Server hochgeladen. Die gesamte Verarbeitung erfolgt lokal im Browser mit JavaScript.', items: ['Datei wird direkt von Ihrem Gerät gelesen', 'Bearbeitung erfolgt im Browser-Speicher', 'Dokument wird nur gespeichert, wenn Sie auf "Exportieren" klicken', 'Dateiinhalte werden nicht an unsere Server übermittelt', 'Wir können Ihre PDFs nicht einsehen, lesen oder speichern'] },
        { heading: '1.3 Technische Informationen', content: 'Beim Besuch der Website können automatisch technische Informationen gesammelt werden, die Sie nicht direkt identifizieren:', items: ['Browser-Informationen: Typ, Version, Spracheinstellungen', 'Geräteinformationen: Gerätetyp, Betriebssystem, Bildschirmauflösung', 'Nutzungsdaten: besuchte Seiten, Zeit auf der Website, Navigationsaktionen', 'IP-Adresse: kann für Sicherheit und Analytik in anonymisierter Form verwendet werden'] },
        { heading: '1.4 Cookies und ähnliche Technologien', content: 'Wir können Cookies für den korrekten Betrieb der Website, die Speicherung von Spracheinstellungen und Analytik verwenden.', items: ['Wesentliche Cookies: für den grundlegenden Betrieb der Website erforderlich', 'Präferenz-Cookies: merken sich Sprache und Einstellungen', 'Analytik-Cookies: helfen die Nutzung der Website zu verstehen', 'Werbe-Cookies: können zur Anzeige relevanter Werbung verwendet werden'] },
      ]},
      { heading: '2. Wie wir Informationen verwenden', content: 'Die begrenzten technischen Daten werden verwendet für:', items: ['Verbesserung des Dienstes und der Benutzeroberfläche', 'Analyse der Stabilität und Leistung', 'Schutz vor Missbrauch und Betrug', 'Speicherung Ihrer lokalen Einstellungen', 'Bewertung der Wirksamkeit der Website und Werbeintegrationen'] },
      { heading: '3. Drittanbieter-Dienste und Werbung', subsections: [
        { heading: '3.1 Google AdSense', content: 'Die Website kann Google AdSense zur Anzeige von Werbung verwenden. Google kann Cookies und andere Technologien zur Personalisierung von Werbung, Messung der Effektivität und zum Schutz vor Betrug anwenden.' },
        { heading: '3.2 Analytik', content: 'Wir können Analysetools verwenden, um das Benutzerverhalten auf der Website zu verstehen: welche Seiten aufgerufen werden, wie lange Sitzungen dauern und von welchen Geräten Besucher kommen.' },
        { heading: '3.3 Andere Drittanbieter-Dienste', content: 'Wir können auch Drittanbieter-Infrastruktur für Hosting, Content-Delivery und Website-Schutz nutzen. Diese Dienste haben eigene Datenschutzrichtlinien.' },
      ]},
      { heading: '4. Datenspeicherung und Sicherheit', subsections: [
        { heading: '4.1 Lokale Speicherung', content: 'Ihr Browser kann lokale Einstellungen, Ressourcen-Cache und temporären Interface-Zustand für schnelleren Betrieb der Website speichern.', items: ['Zoom-Stufe und individuelle Interface-Einstellungen', 'Spracheinstellungen', 'Gecachte Anwendungsressourcen', 'Temporärer Zustand der aktuellen Bearbeitungssitzung'] },
        { heading: '4.2 Server-Speicherung', content: 'Wir speichern keine PDF-Dateien auf Servern. Bei Bedarf können nur anonymisierte Analysedaten, Fehlerprotokolle und Sicherheitsprotokolle gespeichert werden.' },
        { heading: '4.3 Sicherheit', content: 'Da Dokumente nicht auf den Server hochgeladen werden, besteht kein Risiko einer PDF-Kompromittierung durch einen Server-Datenleck. Zusätzlich verwenden wir HTTPS und grundlegende Website-Sicherheitsmaßnahmen.' },
      ]},
      { heading: '5. Datenspeicherfristen', items: ['Analysedaten: können in aggregierter Form bis zu 26 Monate gespeichert werden', 'Fehlerprotokolle: bis zu 90 Tage zur Problemdiagnose', 'Sicherheitsprotokolle: bis zu 12 Monate zur Missbrauchsprävention', 'Lokale Speicherung: in Ihrem Browser gespeichert, bis Sie die Daten löschen'] },
      { heading: '6. Ihre Rechte und Wahlmöglichkeiten', content: 'Je nach Ihrem Wohnland können Sie das Recht haben, Informationen über die Datenverarbeitung abzurufen, diese Verarbeitung einzuschränken, bestimmte Daten zu löschen oder sich von personalisierter Werbung abzumelden. Für Datenschutzanfragen kontaktieren Sie uns unter hello@editorapdf.com.' },
      { heading: '7. Cookies und Werbeeinstellungen', content: 'Sie können Cookies über Ihre Browser-Einstellungen verwalten. Das Deaktivieren bestimmter Cookies kann einige Website-Funktionen beeinträchtigen, aber die lokale PDF-Verarbeitung wird weiterhin funktionieren.' },
      { heading: '8. Datenschutz für Kinder', content: 'Der Dienst ist nicht speziell für Kinder unter 13 Jahren konzipiert. Wir sammeln wissentlich keine persönlichen Daten von Kindern.' },
      { heading: '9. Internationale Nutzer', content: 'EditoraPDF ist in verschiedenen Ländern verfügbar. Ihre PDF-Dateien werden nicht zwischen Ländern übertragen, da sie lokal im Browser verarbeitet werden. Drittanbieter-Analyse- oder Werbedienste können technische Daten jedoch außerhalb Ihrer Jurisdiktion gemäß ihren eigenen Richtlinien verarbeiten.' },
      { heading: '10. Änderungen dieser Richtlinie', content: 'Wir können diese Datenschutzrichtlinie regelmäßig aufgrund von Änderungen in Technologie, Recht oder Servicebetrieb aktualisieren. Die aktuelle Version ist immer auf dieser Seite veröffentlicht.' },
      { heading: '11. Kontakt', content: '' },
    ],
    contactTitle: 'E-Mail:', contactEmail: 'hello@editorapdf.com', contactPage: 'Kontaktseite:',
    copyright: '© 2026 EditoraPDF. Ihre Privatsphäre ist uns wichtig.', termsLink: 'Nutzungsbedingungen', contactLink: 'Kontakt',
  },
  fr: {
    title: 'Politique de confidentialité', updated: 'Dernière mise à jour : 30 janvier 2026',
    priorityTitle: 'Votre vie privée est notre priorité',
    priorityDesc: 'EditoraPDF traite tous les PDFs entièrement dans votre navigateur. Vos fichiers ne quittent jamais votre appareil et ne sont jamais téléchargés sur nos serveurs.',
    disclaimer: 'Important : le service est fourni à des fins d\'utilisation générale. Veuillez toujours vérifier les documents après modification avant toute utilisation officielle ou soumission.',
    sections: [
      { heading: '1. Informations que nous collectons', subsections: [
        { heading: '1.1 Informations personnelles', content: 'Nous n\'exigeons pas d\'inscription, de création de compte ou de soumission de données personnelles pour utiliser les outils principaux d\'EditoraPDF.' },
        { heading: '1.2 Vos documents PDF', content: 'Vos fichiers PDF ne sont pas téléchargés sur nos serveurs. Tout le traitement se fait localement dans le navigateur via JavaScript.', items: ['Le fichier est lu directement depuis votre appareil', 'L\'édition est effectuée dans la mémoire du navigateur', 'Le document est sauvegardé uniquement lorsque vous cliquez sur "Exporter"', 'Les contenus de fichiers ne sont pas transmis à nos serveurs', 'Nous ne pouvons pas voir, lire ou stocker vos PDFs'] },
        { heading: '1.3 Informations techniques', content: 'Lors de votre visite sur le site, des informations techniques qui ne vous identifient pas directement peuvent être collectées automatiquement:', items: ['Informations sur le navigateur : type, version, paramètres de langue', 'Informations sur l\'appareil : type d\'appareil, OS, résolution d\'écran', 'Données d\'utilisation : pages vues, temps sur le site, actions de navigation', 'Adresse IP : peut être utilisée pour la sécurité et l\'analytique sous forme anonymisée'] },
        { heading: '1.4 Cookies et technologies similaires', content: 'Nous pouvons utiliser des cookies pour le bon fonctionnement du site, le stockage des préférences de langue et l\'analytique.', items: ['Cookies essentiels : requis pour le fonctionnement de base du site', 'Cookies de préférence : mémorisent la langue et les paramètres', 'Cookies analytiques : aident à comprendre l\'utilisation du site', 'Cookies publicitaires : peuvent être utilisés pour afficher des publicités pertinentes'] },
      ]},
      { heading: '2. Comment nous utilisons les informations', content: 'Les données techniques limitées que nous collectons sont utilisées pour :', items: ['Améliorer le service et l\'interface', 'Analyser la stabilité et les performances', 'Protéger contre les abus et la fraude', 'Sauvegarder vos paramètres locaux', 'Évaluer l\'efficacité du site et des intégrations publicitaires'] },
      { heading: '3. Services tiers et publicité', subsections: [
        { heading: '3.1 Google AdSense', content: 'Le site peut utiliser Google AdSense pour afficher de la publicité. Google peut appliquer des cookies et d\'autres technologies pour personnaliser les publicités, mesurer leur efficacité et se protéger contre la fraude.' },
        { heading: '3.2 Analytique', content: 'Nous pouvons utiliser des outils d\'analyse pour comprendre le comportement des utilisateurs sur le site : quelles pages sont consultées, combien de temps durent les sessions et depuis quels appareils les visiteurs accèdent.' },
        { heading: '3.3 Autres services tiers', content: 'Nous pouvons également utiliser une infrastructure tierce pour l\'hébergement, la livraison de contenu et la protection du site. Ces services ont leurs propres politiques de confidentialité.' },
      ]},
      { heading: '4. Stockage des données et sécurité', subsections: [
        { heading: '4.1 Stockage local', content: 'Votre navigateur peut stocker des paramètres locaux, le cache des ressources et l\'état temporaire de l\'interface pour un fonctionnement plus rapide du site.', items: ['Niveau de zoom et paramètres individuels de l\'interface', 'Préférences de langue', 'Ressources d\'application mises en cache', 'État temporaire de la session d\'édition en cours'] },
        { heading: '4.2 Stockage serveur', content: 'Nous ne stockons pas de fichiers PDF sur les serveurs. Seules des données analytiques anonymisées, des journaux d\'erreurs et des journaux de sécurité peuvent être stockés si nécessaire.' },
        { heading: '4.3 Sécurité', content: 'Comme les documents ne sont pas téléchargés sur le serveur, il n\'y a aucun risque de compromission PDF par une fuite de données serveur. Nous utilisons également HTTPS et des mesures de sécurité de base.' },
      ]},
      { heading: '5. Durée de conservation des données', items: ['Données analytiques : peuvent être conservées sous forme agrégée jusqu\'à 26 mois', 'Journaux d\'erreurs : jusqu\'à 90 jours pour le diagnostic des problèmes', 'Journaux de sécurité : jusqu\'à 12 mois pour prévenir les abus', 'Stockage local : conservé dans votre navigateur jusqu\'à ce que vous effaciez les données'] },
      { heading: '6. Vos droits et choix', content: 'Selon votre pays de résidence, vous pouvez avoir le droit d\'accéder aux informations sur le traitement des données, de restreindre ce traitement, de supprimer certaines données ou de vous désinscrire de la publicité personnalisée. Pour les demandes liées à la confidentialité, contactez-nous à hello@editorapdf.com.' },
      { heading: '7. Cookies et paramètres publicitaires', content: 'Vous pouvez gérer les cookies via les paramètres de votre navigateur. La désactivation de certains cookies peut affecter certaines fonctionnalités du site, mais le traitement local de base des PDF continuera de fonctionner.' },
      { heading: '8. Confidentialité des enfants', content: 'Le service n\'est pas spécifiquement conçu pour les enfants de moins de 13 ans. Nous ne collectons pas sciemment de données personnelles auprès des enfants.' },
      { heading: '9. Utilisateurs internationaux', content: 'EditoraPDF est disponible dans différents pays. Vos fichiers PDF ne sont pas transférés entre pays car ils sont traités localement dans le navigateur. Cependant, les services d\'analyse ou de publicité tiers peuvent traiter des données techniques en dehors de votre juridiction selon leurs propres politiques.' },
      { heading: '10. Modifications de cette politique', content: 'Nous pouvons mettre à jour périodiquement cette politique de confidentialité en raison de changements technologiques, législatifs ou opérationnels. La version actuelle est toujours publiée sur cette page.' },
      { heading: '11. Contact', content: '' },
    ],
    contactTitle: 'E-mail :', contactEmail: 'hello@editorapdf.com', contactPage: 'Page de contact :',
    copyright: '© 2026 EditoraPDF. Votre vie privée compte.', termsLink: 'Conditions d\'utilisation', contactLink: 'Contact',
  },
  es: {
    title: 'Política de privacidad', updated: 'Última actualización: 30 de enero de 2026',
    priorityTitle: 'Su privacidad es nuestra prioridad',
    priorityDesc: 'EditoraPDF procesa todos los PDFs completamente en su navegador. Sus archivos nunca salen de su dispositivo y nunca se cargan en nuestros servidores.',
    disclaimer: 'Importante: el servicio se proporciona para uso general. Por favor, siempre verifique los documentos después de editar antes de uso oficial o envío.',
    sections: [
      { heading: '1. Información que recopilamos', subsections: [
        { heading: '1.1 Información personal', content: 'No requerimos registro, creación de cuenta ni envío de datos personales para usar las herramientas principales de EditoraPDF.' },
        { heading: '1.2 Sus documentos PDF', content: 'Sus archivos PDF no se cargan en nuestros servidores. Todo el procesamiento ocurre localmente en el navegador usando JavaScript.', items: ['El archivo se lee directamente desde su dispositivo', 'La edición se realiza en la memoria del navegador', 'El documento se guarda solo cuando hace clic en "Exportar"', 'Los contenidos de los archivos no se transmiten a nuestros servidores', 'No podemos ver, leer ni almacenar sus PDFs'] },
        { heading: '1.3 Información técnica', content: 'Al visitar el sitio, se puede recopilar automáticamente información técnica que no lo identifica directamente:', items: ['Información del navegador: tipo, versión, configuración de idioma', 'Información del dispositivo: tipo de dispositivo, SO, resolución de pantalla', 'Datos de uso: páginas vistas, tiempo en el sitio, acciones de navegación', 'Dirección IP: puede usarse para seguridad y análisis en forma anonimizada'] },
        { heading: '1.4 Cookies y tecnologías similares', content: 'Podemos usar cookies para el correcto funcionamiento del sitio, almacenamiento de preferencias de idioma y análisis.', items: ['Cookies esenciales: requeridas para el funcionamiento básico del sitio', 'Cookies de preferencia: recuerdan el idioma y la configuración', 'Cookies analíticas: ayudan a entender el uso del sitio', 'Cookies publicitarias: pueden usarse para mostrar anuncios relevantes'] },
      ]},
      { heading: '2. Cómo usamos la información', content: 'Los datos técnicos limitados que recopilamos se utilizan para:', items: ['Mejorar el servicio y la interfaz', 'Analizar la estabilidad y el rendimiento', 'Proteger contra abusos y fraudes', 'Guardar su configuración local', 'Evaluar la efectividad del sitio y las integraciones publicitarias'] },
      { heading: '3. Servicios de terceros y publicidad', subsections: [
        { heading: '3.1 Google AdSense', content: 'El sitio puede usar Google AdSense para mostrar publicidad. Google puede aplicar cookies y otras tecnologías para personalizar anuncios, medir efectividad y proteger contra fraudes.' },
        { heading: '3.2 Análisis', content: 'Podemos usar herramientas de análisis para entender el comportamiento de los usuarios en el sitio: qué páginas se ven, cuánto duran las sesiones y desde qué dispositivos acceden los visitantes.' },
        { heading: '3.3 Otros servicios de terceros', content: 'También podemos usar infraestructura de terceros para hosting, entrega de contenido y protección del sitio. Estos servicios tienen sus propias políticas de privacidad.' },
      ]},
      { heading: '4. Almacenamiento de datos y seguridad', subsections: [
        { heading: '4.1 Almacenamiento local', content: 'Su navegador puede almacenar configuraciones locales, caché de recursos y estado temporal de la interfaz para un funcionamiento más rápido del sitio.', items: ['Nivel de zoom y configuraciones individuales de la interfaz', 'Preferencias de idioma', 'Recursos de aplicación en caché', 'Estado temporal de la sesión de edición actual'] },
        { heading: '4.2 Almacenamiento en servidor', content: 'No almacenamos archivos PDF en servidores. Solo se pueden almacenar datos analíticos anonimizados, registros de errores y registros de seguridad según sea necesario.' },
        { heading: '4.3 Seguridad', content: 'Como los documentos no se cargan en el servidor, no hay riesgo de compromiso de PDF a través de una filtración de datos del servidor. Adicionalmente usamos HTTPS y medidas básicas de seguridad del sitio.' },
      ]},
      { heading: '5. Retención de datos', items: ['Datos analíticos: pueden almacenarse en forma agregada hasta 26 meses', 'Registros de errores: hasta 90 días para diagnóstico de problemas', 'Registros de seguridad: hasta 12 meses para prevenir abusos', 'Almacenamiento local: almacenado en su navegador hasta que usted borre los datos'] },
      { heading: '6. Sus derechos y opciones', content: 'Según su país de residencia, puede tener derecho a acceder a información sobre el procesamiento de datos, restringir dicho procesamiento, eliminar ciertos datos u optar por no recibir publicidad personalizada. Para consultas de privacidad, contáctenos en hello@editorapdf.com.' },
      { heading: '7. Cookies y configuración publicitaria', content: 'Puede administrar las cookies a través de la configuración de su navegador. Deshabilitar ciertas cookies puede afectar algunas funcionalidades del sitio, pero el procesamiento local de PDF seguirá funcionando.' },
      { heading: '8. Privacidad de los niños', content: 'El servicio no está diseñado específicamente para niños menores de 13 años. No recopilamos a sabiendas datos personales de niños.' },
      { heading: '9. Usuarios internacionales', content: 'EditoraPDF está disponible en varios países. Sus archivos PDF no se transfieren entre países ya que se procesan localmente en el navegador. Sin embargo, los servicios de análisis o publicidad de terceros pueden procesar datos técnicos fuera de su jurisdicción según sus propias políticas.' },
      { heading: '10. Cambios en esta política', content: 'Podemos actualizar periódicamente esta política de privacidad debido a cambios en tecnología, legislación u operación del servicio. La versión actual siempre se publica en esta página.' },
      { heading: '11. Contacto', content: '' },
    ],
    contactTitle: 'Correo electrónico:', contactEmail: 'hello@editorapdf.com', contactPage: 'Página de contacto:',
    copyright: '© 2026 EditoraPDF. Su privacidad importa.', termsLink: 'Términos de servicio', contactLink: 'Contacto',
  },
  it: {
    title: 'Informativa sulla privacy', updated: 'Ultimo aggiornamento: 30 gennaio 2026',
    priorityTitle: 'La tua privacy è la nostra priorità',
    priorityDesc: 'EditoraPDF elabora tutti i PDF interamente nel tuo browser. I tuoi file non lasciano mai il tuo dispositivo e non vengono mai caricati sui nostri server.',
    disclaimer: 'Importante: il servizio è fornito per uso generale. Ti preghiamo di verificare sempre i documenti dopo la modifica prima dell\'uso ufficiale o dell\'invio.',
    sections: [
      { heading: '1. Informazioni che raccogliamo', subsections: [
        { heading: '1.1 Informazioni personali', content: 'Non richiediamo registrazione, creazione di account o invio di dati personali per utilizzare gli strumenti principali di EditoraPDF.' },
        { heading: '1.2 I tuoi documenti PDF', content: 'I tuoi file PDF non vengono caricati sui nostri server. Tutta l\'elaborazione avviene localmente nel browser utilizzando JavaScript.', items: ['Il file viene letto direttamente dal tuo dispositivo', 'La modifica viene eseguita nella memoria del browser', 'Il documento viene salvato solo quando clicchi su "Esporta"', 'I contenuti dei file non vengono trasmessi ai nostri server', 'Non possiamo visualizzare, leggere o archiviare i tuoi PDF'] },
        { heading: '1.3 Informazioni tecniche', content: 'Quando visiti il sito, possono essere raccolte automaticamente informazioni tecniche che non ti identificano direttamente:', items: ['Informazioni sul browser: tipo, versione, impostazioni della lingua', 'Informazioni sul dispositivo: tipo di dispositivo, SO, risoluzione dello schermo', 'Dati di utilizzo: pagine visualizzate, tempo sul sito, azioni di navigazione', 'Indirizzo IP: può essere utilizzato per sicurezza e analisi in forma anonimizzata'] },
        { heading: '1.4 Cookie e tecnologie simili', content: 'Possiamo utilizzare cookie per il corretto funzionamento del sito, archiviazione delle preferenze della lingua e analisi.', items: ['Cookie essenziali: richiesti per il funzionamento di base del sito', 'Cookie di preferenza: ricordano la lingua e le impostazioni', 'Cookie analitici: aiutano a capire l\'utilizzo del sito', 'Cookie pubblicitari: possono essere utilizzati per mostrare annunci pertinenti'] },
      ]},
      { heading: '2. Come utilizziamo le informazioni', content: 'I dati tecnici limitati che raccogliamo sono utilizzati per:', items: ['Migliorare il servizio e l\'interfaccia', 'Analizzare la stabilità e le prestazioni', 'Proteggere da abusi e frodi', 'Salvare le tue impostazioni locali', 'Valutare l\'efficacia del sito e le integrazioni pubblicitarie'] },
      { heading: '3. Servizi di terze parti e pubblicità', subsections: [
        { heading: '3.1 Google AdSense', content: 'Il sito può utilizzare Google AdSense per visualizzare pubblicità. Google può applicare cookie e altre tecnologie per personalizzare gli annunci, misurarne l\'efficacia e proteggere dalle frodi.' },
        { heading: '3.2 Analisi', content: 'Possiamo utilizzare strumenti di analisi per capire il comportamento degli utenti sul sito: quali pagine vengono visualizzate, quanto durano le sessioni e da quali dispositivi accedono i visitatori.' },
        { heading: '3.3 Altri servizi di terze parti', content: 'Possiamo anche utilizzare infrastrutture di terze parti per hosting, distribuzione di contenuti e protezione del sito. Questi servizi hanno le proprie informative sulla privacy.' },
      ]},
      { heading: '4. Archiviazione dei dati e sicurezza', subsections: [
        { heading: '4.1 Archiviazione locale', content: 'Il tuo browser può archiviare impostazioni locali, cache delle risorse e stato temporaneo dell\'interfaccia per un funzionamento più rapido del sito.', items: ['Livello di zoom e impostazioni individuali dell\'interfaccia', 'Preferenze di lingua', 'Risorse dell\'applicazione nella cache', 'Stato temporaneo della sessione di modifica corrente'] },
        { heading: '4.2 Archiviazione su server', content: 'Non archiviamo file PDF sui server. Solo dati analitici anonimizzati, log degli errori e log di sicurezza possono essere archiviati se necessario.' },
        { heading: '4.3 Sicurezza', content: 'Poiché i documenti non vengono caricati sul server, non c\'è rischio di compromissione dei PDF attraverso una violazione dei dati del server. Utilizziamo inoltre HTTPS e misure di sicurezza di base del sito.' },
      ]},
      { heading: '5. Conservazione dei dati', items: ['Dati analitici: possono essere archiviati in forma aggregata fino a 26 mesi', 'Log degli errori: fino a 90 giorni per la diagnosi dei problemi', 'Log di sicurezza: fino a 12 mesi per prevenire gli abusi', 'Archiviazione locale: archiviata nel tuo browser finché non cancelli i dati'] },
      { heading: '6. I tuoi diritti e scelte', content: 'A seconda del tuo paese di residenza, potresti avere il diritto di accedere alle informazioni sul trattamento dei dati, limitare tale trattamento, eliminare determinati dati o rinunciare alla pubblicità personalizzata. Per richieste sulla privacy, contattaci all\'indirizzo hello@editorapdf.com.' },
      { heading: '7. Cookie e impostazioni pubblicitarie', content: 'Puoi gestire i cookie tramite le impostazioni del tuo browser. La disabilitazione di alcuni cookie può influire su alcune funzionalità del sito, ma l\'elaborazione locale di base dei PDF continuerà a funzionare.' },
      { heading: '8. Privacy dei minori', content: 'Il servizio non è specificamente progettato per bambini di età inferiore a 13 anni. Non raccogliamo consapevolmente dati personali dai bambini.' },
      { heading: '9. Utenti internazionali', content: 'EditoraPDF è disponibile in vari paesi. I tuoi file PDF non vengono trasferiti tra paesi poiché vengono elaborati localmente nel browser. Tuttavia, i servizi di analisi o pubblicità di terze parti possono elaborare dati tecnici al di fuori della tua giurisdizione secondo le proprie politiche.' },
      { heading: '10. Modifiche a questa policy', content: 'Possiamo aggiornare periodicamente questa informativa sulla privacy a causa di cambiamenti nella tecnologia, nella legge o nel funzionamento del servizio. La versione attuale è sempre pubblicata su questa pagina.' },
      { heading: '11. Contatto', content: '' },
    ],
    contactTitle: 'Email:', contactEmail: 'hello@editorapdf.com', contactPage: 'Pagina contatti:',
    copyright: '© 2026 EditoraPDF. La tua privacy è importante.', termsLink: 'Termini di servizio', contactLink: 'Contatto',
  },
}

export default function LocalePrivacyPolicyPage({ params }: { params: { locale: string } }) {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale
  const c = privacyContent[locale] ?? privacyContent.en
  const withLocale = (path: string) => `/${locale}${path}`

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 p-6 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 prose prose-invert prose-primary max-w-none">
            <div className="text-center mb-12 not-prose">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
                <Shield size={32} strokeWidth={1.5} className="text-primary-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.title}</h1>
              <p className="text-surface-400">{c.updated}</p>
            </div>

            {/* Priority card */}
            <div className="not-prose mb-8 p-6 rounded-xl bg-success-500/10 border border-success-500/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success-500/20 flex items-center justify-center">
                  <Shield size={20} strokeWidth={2} className="text-success-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-success-300 mb-2">{c.priorityTitle}</h3>
                  <p className="text-surface-300">{c.priorityDesc}</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="not-prose mb-8 p-5 rounded-xl bg-warning-500/10 border border-warning-500/30">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} strokeWidth={2} className="text-warning-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-surface-300 leading-relaxed">{c.disclaimer}</p>
              </div>
            </div>

            {/* Sections */}
            {c.sections.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                {section.subsections ? section.subsections.map((sub) => (
                  <div key={sub.heading}>
                    <h3>{sub.heading}</h3>
                    {sub.content && <p>{sub.content}</p>}
                    {sub.items && <ul>{sub.items.map((item, i) => <li key={i}>{item}</li>)}</ul>}
                  </div>
                )) : null}
                {section.content && section.content !== '' && <p>{section.content}</p>}
                {section.items && <ul>{section.items.map((item, i) => <li key={i}>{item}</li>)}</ul>}
              </div>
            ))}

            {/* Contact */}
            <div className="not-prose bg-surface-800/30 p-6 rounded-xl border border-surface-700/50">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail size={20} strokeWidth={2} className="text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">{c.contactTitle}</strong>{' '}
                    <a href={`mailto:${c.contactEmail}`} className="text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1">
                      {c.contactEmail}
                      <ExternalLink size={14} strokeWidth={2} />
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5">
                    <span className="text-primary-400">•</span>
                  </div>
                  <div>
                    <strong className="text-white">{c.contactPage}</strong>{' '}
                    <Link href={withLocale('/contact')} className="text-primary-400 hover:text-primary-300 transition-colors">
                      editorapdf.com/contact
                    </Link>
                  </div>
                </li>
              </ul>
            </div>

            <div className="not-prose mt-12 pt-8 border-t border-surface-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-surface-500">{c.copyright}</p>
                <div className="flex gap-4">
                  <Link href={withLocale('/terms')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    {c.termsLink}
                  </Link>
                  <Link href={withLocale('/contact')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    {c.contactLink}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}
