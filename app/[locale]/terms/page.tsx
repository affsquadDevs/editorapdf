import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '../../components/Header'
import { FileText, AlertTriangle, Info, Mail, ExternalLink } from 'lucide-react'
import { defaultLocale, isSupportedLocale, normalizeLocale, type AppLocale } from '../../../i18n/config'
import { getMessages } from '../../i18n/messages'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale
  const messages = getMessages(locale)
  const t = (key: string) => messages[key] ?? key
  return {
    title: t('terms.title') + ' | EditoraPDF',
    description: t('terms.desc'),
  }
}

type TermsContent = {
  title: string
  updated: string
  disclaimer: { heading: string; intro: string; items: string[] }
  adNote: { heading: string; text: string }
  sections: { heading: string; content: string | string[] }[]
  contactTitle: string
  contactEmail: string
  contactPage: string
  copyright: string
  privacyLink: string
  contactLink: string
}

const termsContent: Record<AppLocale, TermsContent> = {
  en: {
    title: 'Terms of Service',
    updated: 'Last updated: January 30, 2026',
    disclaimer: {
      heading: 'Disclaimer: Risk Warning',
      intro: 'EditoraPDF is provided "AS IS", without any warranties. By using the service, you agree that:',
      items: [
        'you use the service at your own risk;',
        'we make no guarantees about the accuracy of PDF editing results;',
        'data loss or corruption may occur during processing;',
        'complex PDFs may render or edit incorrectly;',
        'you should keep backups of original files.',
      ],
    },
    adNote: {
      heading: 'Free Service with Advertising',
      text: 'EditoraPDF is a completely free service. To support the site, third-party advertisements, partner offers, and affiliate links may be displayed.',
    },
    sections: [
      { heading: '1. Acceptance of Terms', content: 'By using EditoraPDF, you confirm your agreement to these terms. If you do not agree, please do not use the service.' },
      { heading: '2. Service Description', content: ['EditoraPDF is a browser-based PDF tool that allows you to view, edit, convert, merge, split, and export PDF files.', 'Most processing is performed locally in your browser. You are responsible for verifying results before using documents.'] },
      { heading: '3. Usage Rules', content: ['Only use files you have legal rights to process.', 'Always keep backups of originals.', 'Verify the document after editing before sending or publishing.', 'Do not use the service for unlawful purposes.'] },
      { heading: '4. Limitations and Compatibility', content: ['PDF files are supported; encrypted/password-protected documents may not be supported.', 'Large or complex documents may perform more slowly.', 'A modern browser with JavaScript enabled is required for correct operation.'] },
      { heading: '5. Disclaimer of Warranties', content: 'The service is provided without express or implied warranties, including those regarding uninterrupted operation, absence of errors, merchantability, or fitness for a particular purpose.' },
      { heading: '6. Limitation of Liability', content: 'To the extent permitted by law, EditoraPDF is not liable for direct or indirect damages, data loss, loss of profits, or other consequences related to the use or inability to use the service.' },
      { heading: '7. Advertising and Third-Party Services', content: 'The site may use third-party advertising/analytics services. We are not responsible for the content or policies of third-party sites linked through advertising or other links.' },
      { heading: '8. Intellectual Property', content: 'The EditoraPDF platform rights belong to its owners. You retain rights to your own files and content that you process through the service.' },
      { heading: '9. Changes to Service and Terms', content: 'We may update the functionality of the service and change these terms. The current version is always published on this page.' },
      { heading: '10. Contact', content: '' },
    ],
    contactTitle: 'Email:', contactEmail: 'hello@editorapdf.com', contactPage: 'Contact page:', copyright: '© 2026 EditoraPDF. All rights reserved.', privacyLink: 'Privacy Policy', contactLink: 'Contact Us',
  },
  uk: {
    title: 'Умови використання',
    updated: 'Останнє оновлення: 30 січня 2026',
    disclaimer: {
      heading: 'Важливо: попередження про ризики',
      intro: 'EditoraPDF надається «ЯК Є», без будь-яких гарантій. Використовуючи сервіс, ви погоджуєтесь, що:',
      items: [
        'ви використовуєте сервіс на власний ризик;',
        'ми не гарантуємо абсолютну точність результатів редагування PDF;',
        'під час обробки може виникнути втрата або пошкодження даних;',
        'складні PDF можуть відображатися або редагуватися некоректно;',
        'ви маєте зберігати резервні копії оригінальних файлів.',
      ],
    },
    adNote: {
      heading: 'Безкоштовний сервіс із рекламою',
      text: 'EditoraPDF є повністю безкоштовним сервісом. Для підтримки роботи сайту можуть показуватися сторонні рекламні матеріали, партнерські пропозиції та афілійовані посилання.',
    },
    sections: [
      { heading: '1. Прийняття умов', content: 'Користуючись EditoraPDF, ви підтверджуєте згоду з цими умовами. Якщо ви не погоджуєтесь з ними, будь ласка, не використовуйте сервіс.' },
      { heading: '2. Опис сервісу', content: ['EditoraPDF — це браузерний інструмент для роботи з PDF, який дозволяє переглядати, редагувати, конвертувати, об\'єднувати, розділяти та експортувати PDF-файли.', 'Більшість обробки виконується локально у вашому браузері. Ви несете відповідальність за перевірку результатів перед використанням документів.'] },
      { heading: '3. Правила використання', content: ['Використовуйте лише файли, на які маєте законні права.', 'Завжди зберігайте резервні копії оригіналів.', 'Перевіряйте документ після редагування перед надсиланням або публікацією.', 'Не використовуйте сервіс у протиправних цілях.'] },
      { heading: '4. Обмеження та сумісність', content: ['Підтримуються PDF-файли; зашифровані/захищені паролем документи можуть не підтримуватись.', 'Великі або складні документи можуть працювати повільніше.', 'Для коректної роботи потрібен сучасний браузер і увімкнений JavaScript.'] },
      { heading: '5. Відмова від гарантій', content: 'Сервіс надається без явних або неявних гарантій, зокрема щодо безперервної роботи, відсутності помилок, комерційної придатності або придатності для конкретної мети.' },
      { heading: '6. Обмеження відповідальності', content: 'У межах, дозволених законодавством, EditoraPDF не несе відповідальності за прямі або непрямі збитки, втрату даних, прибутку чи інші наслідки, пов\'язані з використанням або неможливістю використання сервісу.' },
      { heading: '7. Реклама та сторонні сервіси', content: 'Сайт може використовувати сторонні рекламні/аналітичні сервіси. Ми не несемо відповідальності за вміст або політики сторонніх сайтів, на які ведуть рекламні чи інші посилання.' },
      { heading: '8. Інтелектуальна власність', content: 'Права на платформу EditoraPDF належать її власникам. Ви зберігаєте права на власні файли та контент, які обробляєте через сервіс.' },
      { heading: '9. Зміни в сервісі та умовах', content: 'Ми можемо оновлювати функціональність сервісу та змінювати ці умови. Актуальна редакція завжди публікується на цій сторінці.' },
      { heading: '10. Контакти', content: '' },
    ],
    contactTitle: 'Електронна пошта:', contactEmail: 'hello@editorapdf.com', contactPage: 'Сторінка контактів:', copyright: '© 2026 EditoraPDF. Усі права захищено.', privacyLink: 'Політика конфіденційності', contactLink: 'Зв\'язатися з нами',
  },
  de: {
    title: 'Nutzungsbedingungen',
    updated: 'Zuletzt aktualisiert: 30. Januar 2026',
    disclaimer: {
      heading: 'Haftungsausschluss: Risikowarnung',
      intro: 'EditoraPDF wird "WIE BESEHEN" ohne jegliche Garantien bereitgestellt. Durch die Nutzung des Dienstes stimmen Sie zu, dass:',
      items: [
        'Sie den Dienst auf eigenes Risiko nutzen;',
        'wir keine Garantien für die Genauigkeit der PDF-Bearbeitungsergebnisse geben;',
        'Datenverlust oder -beschädigung während der Verarbeitung auftreten kann;',
        'komplexe PDFs möglicherweise nicht korrekt gerendert oder bearbeitet werden;',
        'Sie Sicherungskopien der Originaldateien aufbewahren sollten.',
      ],
    },
    adNote: {
      heading: 'Kostenloser Dienst mit Werbung',
      text: 'EditoraPDF ist ein völlig kostenloser Dienst. Zur Unterstützung der Website können Drittanbieterwerbung, Partnerangebote und Affiliate-Links angezeigt werden.',
    },
    sections: [
      { heading: '1. Annahme der Bedingungen', content: 'Durch die Nutzung von EditoraPDF bestätigen Sie Ihre Zustimmung zu diesen Bedingungen. Falls Sie nicht zustimmen, nutzen Sie den Dienst bitte nicht.' },
      { heading: '2. Dienstbeschreibung', content: ['EditoraPDF ist ein browserbasiertes PDF-Tool, mit dem Sie PDF-Dateien anzeigen, bearbeiten, konvertieren, zusammenführen, aufteilen und exportieren können.', 'Die meiste Verarbeitung erfolgt lokal in Ihrem Browser. Sie sind für die Überprüfung der Ergebnisse vor der Verwendung von Dokumenten verantwortlich.'] },
      { heading: '3. Nutzungsregeln', content: ['Verwenden Sie nur Dateien, für die Sie rechtliche Befugnisse haben.', 'Bewahren Sie immer Sicherungskopien der Originale auf.', 'Überprüfen Sie das Dokument nach der Bearbeitung, bevor Sie es senden oder veröffentlichen.', 'Nutzen Sie den Dienst nicht für rechtswidrige Zwecke.'] },
      { heading: '4. Einschränkungen und Kompatibilität', content: ['PDF-Dateien werden unterstützt; verschlüsselte/passwortgeschützte Dokumente werden möglicherweise nicht unterstützt.', 'Große oder komplexe Dokumente können langsamer verarbeitet werden.', 'Ein moderner Browser mit aktiviertem JavaScript ist für den korrekten Betrieb erforderlich.'] },
      { heading: '5. Gewährleistungsausschluss', content: 'Der Dienst wird ohne ausdrückliche oder stillschweigende Garantien bereitgestellt, einschließlich solcher bezüglich ununterbrochenen Betriebs, Fehlerfreiheit, Marktgängigkeit oder Eignung für einen bestimmten Zweck.' },
      { heading: '6. Haftungsbeschränkung', content: 'Soweit gesetzlich zulässig, haftet EditoraPDF nicht für direkte oder indirekte Schäden, Datenverlust, Gewinnverlust oder andere Folgen im Zusammenhang mit der Nutzung oder Nichtnutzbarkeit des Dienstes.' },
      { heading: '7. Werbung und Drittanbieterdienste', content: 'Die Website kann Drittanbieter-Werbe-/Analysedienste nutzen. Wir sind nicht verantwortlich für den Inhalt oder die Richtlinien von Drittanbieter-Websites, auf die durch Werbung oder andere Links verwiesen wird.' },
      { heading: '8. Geistiges Eigentum', content: 'Die Rechte an der EditoraPDF-Plattform gehören ihren Eigentümern. Sie behalten die Rechte an Ihren eigenen Dateien und Inhalten, die Sie über den Dienst verarbeiten.' },
      { heading: '9. Änderungen am Dienst und den Bedingungen', content: 'Wir können die Funktionalität des Dienstes aktualisieren und diese Bedingungen ändern. Die aktuelle Version wird immer auf dieser Seite veröffentlicht.' },
      { heading: '10. Kontakt', content: '' },
    ],
    contactTitle: 'E-Mail:', contactEmail: 'hello@editorapdf.com', contactPage: 'Kontaktseite:', copyright: '© 2026 EditoraPDF. Alle Rechte vorbehalten.', privacyLink: 'Datenschutzrichtlinie', contactLink: 'Kontakt aufnehmen',
  },
  fr: {
    title: 'Conditions d\'utilisation',
    updated: 'Dernière mise à jour : 30 janvier 2026',
    disclaimer: {
      heading: 'Avertissement : avis de risque',
      intro: 'EditoraPDF est fourni "TEL QUEL", sans aucune garantie. En utilisant le service, vous acceptez que :',
      items: [
        'vous utilisez le service à vos propres risques ;',
        'nous ne garantissons pas l\'exactitude des résultats d\'édition PDF ;',
        'une perte ou corruption de données peut survenir lors du traitement ;',
        'les PDF complexes peuvent ne pas s\'afficher ou s\'éditer correctement ;',
        'vous devez conserver des sauvegardes des fichiers originaux.',
      ],
    },
    adNote: {
      heading: 'Service gratuit avec publicité',
      text: 'EditoraPDF est un service entièrement gratuit. Pour soutenir le site, des publicités tierces, des offres partenaires et des liens d\'affiliation peuvent être affichés.',
    },
    sections: [
      { heading: '1. Acceptation des conditions', content: 'En utilisant EditoraPDF, vous confirmez votre accord avec ces conditions. Si vous n\'êtes pas d\'accord, veuillez ne pas utiliser le service.' },
      { heading: '2. Description du service', content: ['EditoraPDF est un outil PDF basé sur navigateur qui vous permet de visualiser, modifier, convertir, fusionner, diviser et exporter des fichiers PDF.', 'La plupart du traitement est effectué localement dans votre navigateur. Vous êtes responsable de vérifier les résultats avant d\'utiliser les documents.'] },
      { heading: '3. Règles d\'utilisation', content: ['N\'utilisez que des fichiers pour lesquels vous avez des droits légaux.', 'Conservez toujours des sauvegardes des originaux.', 'Vérifiez le document après modification avant de l\'envoyer ou de le publier.', 'N\'utilisez pas le service à des fins illégales.'] },
      { heading: '4. Limitations et compatibilité', content: ['Les fichiers PDF sont pris en charge ; les documents chiffrés/protégés par mot de passe peuvent ne pas être pris en charge.', 'Les documents volumineux ou complexes peuvent être traités plus lentement.', 'Un navigateur moderne avec JavaScript activé est requis pour un fonctionnement correct.'] },
      { heading: '5. Exclusion de garantie', content: 'Le service est fourni sans garanties expresses ou implicites, y compris celles relatives au fonctionnement ininterrompu, à l\'absence d\'erreurs, à la qualité marchande ou à l\'adéquation à un usage particulier.' },
      { heading: '6. Limitation de responsabilité', content: 'Dans la mesure permise par la loi, EditoraPDF n\'est pas responsable des dommages directs ou indirects, des pertes de données, de bénéfices ou d\'autres conséquences liées à l\'utilisation ou à l\'impossibilité d\'utiliser le service.' },
      { heading: '7. Publicité et services tiers', content: 'Le site peut utiliser des services publicitaires/analytiques tiers. Nous ne sommes pas responsables du contenu ou des politiques des sites tiers liés par la publicité ou d\'autres liens.' },
      { heading: '8. Propriété intellectuelle', content: 'Les droits sur la plateforme EditoraPDF appartiennent à ses propriétaires. Vous conservez les droits sur vos propres fichiers et contenus que vous traitez via le service.' },
      { heading: '9. Modifications du service et des conditions', content: 'Nous pouvons mettre à jour les fonctionnalités du service et modifier ces conditions. La version actuelle est toujours publiée sur cette page.' },
      { heading: '10. Contact', content: '' },
    ],
    contactTitle: 'E-mail :', contactEmail: 'hello@editorapdf.com', contactPage: 'Page de contact :', copyright: '© 2026 EditoraPDF. Tous droits réservés.', privacyLink: 'Politique de confidentialité', contactLink: 'Nous contacter',
  },
  es: {
    title: 'Términos de servicio',
    updated: 'Última actualización: 30 de enero de 2026',
    disclaimer: {
      heading: 'Descargo de responsabilidad: aviso de riesgo',
      intro: 'EditoraPDF se proporciona "TAL CUAL", sin ninguna garantía. Al usar el servicio, usted acepta que:',
      items: [
        'utiliza el servicio bajo su propio riesgo;',
        'no garantizamos la precisión de los resultados de edición de PDF;',
        'puede ocurrir pérdida o corrupción de datos durante el procesamiento;',
        'los PDF complejos pueden no renderizarse o editarse correctamente;',
        'debe mantener copias de seguridad de los archivos originales.',
      ],
    },
    adNote: {
      heading: 'Servicio gratuito con publicidad',
      text: 'EditoraPDF es un servicio completamente gratuito. Para apoyar el sitio, pueden mostrarse anuncios de terceros, ofertas de socios y enlaces de afiliados.',
    },
    sections: [
      { heading: '1. Aceptación de los términos', content: 'Al usar EditoraPDF, confirma su acuerdo con estos términos. Si no está de acuerdo, por favor no use el servicio.' },
      { heading: '2. Descripción del servicio', content: ['EditoraPDF es una herramienta PDF basada en navegador que le permite ver, editar, convertir, fusionar, dividir y exportar archivos PDF.', 'La mayor parte del procesamiento se realiza localmente en su navegador. Usted es responsable de verificar los resultados antes de usar los documentos.'] },
      { heading: '3. Reglas de uso', content: ['Use solo archivos sobre los que tenga derechos legales.', 'Siempre guarde copias de seguridad de los originales.', 'Verifique el documento después de editar antes de enviarlo o publicarlo.', 'No use el servicio para fines ilegales.'] },
      { heading: '4. Limitaciones y compatibilidad', content: ['Se admiten archivos PDF; los documentos cifrados/protegidos con contraseña pueden no ser compatibles.', 'Los documentos grandes o complejos pueden procesarse más lentamente.', 'Se requiere un navegador moderno con JavaScript habilitado para el correcto funcionamiento.'] },
      { heading: '5. Descargo de garantías', content: 'El servicio se proporciona sin garantías expresas o implícitas, incluidas las relacionadas con la operación ininterrumpida, la ausencia de errores, la comerciabilidad o la idoneidad para un propósito particular.' },
      { heading: '6. Limitación de responsabilidad', content: 'En la medida permitida por la ley, EditoraPDF no es responsable de daños directos o indirectos, pérdida de datos, pérdida de ganancias u otras consecuencias relacionadas con el uso o la imposibilidad de usar el servicio.' },
      { heading: '7. Publicidad y servicios de terceros', content: 'El sitio puede usar servicios publicitarios/analíticos de terceros. No somos responsables del contenido o las políticas de sitios de terceros vinculados a través de publicidad u otros enlaces.' },
      { heading: '8. Propiedad intelectual', content: 'Los derechos sobre la plataforma EditoraPDF pertenecen a sus propietarios. Usted conserva los derechos sobre sus propios archivos y contenidos que procesa a través del servicio.' },
      { heading: '9. Cambios en el servicio y los términos', content: 'Podemos actualizar la funcionalidad del servicio y cambiar estos términos. La versión actual siempre se publica en esta página.' },
      { heading: '10. Contacto', content: '' },
    ],
    contactTitle: 'Correo electrónico:', contactEmail: 'hello@editorapdf.com', contactPage: 'Página de contacto:', copyright: '© 2026 EditoraPDF. Todos los derechos reservados.', privacyLink: 'Política de privacidad', contactLink: 'Contáctenos',
  },
  it: {
    title: 'Termini di servizio',
    updated: 'Ultimo aggiornamento: 30 gennaio 2026',
    disclaimer: {
      heading: 'Dichiarazione di non responsabilità: avviso di rischio',
      intro: 'EditoraPDF è fornito "COSÌ COM\'È", senza alcuna garanzia. Utilizzando il servizio, accetti che:',
      items: [
        'utilizzi il servizio a tuo rischio;',
        'non garantiamo l\'accuratezza dei risultati di modifica PDF;',
        'perdita o corruzione dei dati può verificarsi durante l\'elaborazione;',
        'i PDF complessi potrebbero non essere renderizzati o modificati correttamente;',
        'dovresti mantenere backup dei file originali.',
      ],
    },
    adNote: {
      heading: 'Servizio gratuito con pubblicità',
      text: 'EditoraPDF è un servizio completamente gratuito. Per supportare il sito, potrebbero essere visualizzate pubblicità di terze parti, offerte partner e link di affiliazione.',
    },
    sections: [
      { heading: '1. Accettazione dei termini', content: 'Utilizzando EditoraPDF, confermi il tuo accordo con questi termini. Se non sei d\'accordo, ti preghiamo di non utilizzare il servizio.' },
      { heading: '2. Descrizione del servizio', content: ['EditoraPDF è uno strumento PDF basato su browser che ti consente di visualizzare, modificare, convertire, unire, dividere ed esportare file PDF.', 'La maggior parte dell\'elaborazione viene eseguita localmente nel tuo browser. Sei responsabile della verifica dei risultati prima di utilizzare i documenti.'] },
      { heading: '3. Regole di utilizzo', content: ['Usa solo file su cui hai diritti legali.', 'Conserva sempre backup degli originali.', 'Verifica il documento dopo la modifica prima di inviarlo o pubblicarlo.', 'Non utilizzare il servizio per scopi illegali.'] },
      { heading: '4. Limitazioni e compatibilità', content: ['I file PDF sono supportati; i documenti crittografati/protetti da password potrebbero non essere supportati.', 'I documenti grandi o complessi potrebbero essere elaborati più lentamente.', 'È necessario un browser moderno con JavaScript abilitato per il corretto funzionamento.'] },
      { heading: '5. Esclusione di garanzia', content: 'Il servizio è fornito senza garanzie esplicite o implicite, incluse quelle relative al funzionamento ininterrotto, all\'assenza di errori, alla commerciabilità o all\'idoneità per uno scopo particolare.' },
      { heading: '6. Limitazione di responsabilità', content: 'Nella misura consentita dalla legge, EditoraPDF non è responsabile per danni diretti o indiretti, perdita di dati, perdita di profitti o altre conseguenze legate all\'uso o all\'impossibilità di utilizzare il servizio.' },
      { heading: '7. Pubblicità e servizi di terze parti', content: 'Il sito può utilizzare servizi pubblicitari/analitici di terze parti. Non siamo responsabili del contenuto o delle politiche di siti di terze parti collegati tramite pubblicità o altri link.' },
      { heading: '8. Proprietà intellettuale', content: 'I diritti sulla piattaforma EditoraPDF appartengono ai suoi proprietari. Tu mantieni i diritti sui tuoi file e contenuti che elabori tramite il servizio.' },
      { heading: '9. Modifiche al servizio e ai termini', content: 'Possiamo aggiornare la funzionalità del servizio e modificare questi termini. La versione attuale è sempre pubblicata su questa pagina.' },
      { heading: '10. Contatto', content: '' },
    ],
    contactTitle: 'Email:', contactEmail: 'hello@editorapdf.com', contactPage: 'Pagina contatti:', copyright: '© 2026 EditoraPDF. Tutti i diritti riservati.', privacyLink: 'Informativa sulla privacy', contactLink: 'Contattaci',
  },
}

export default function LocaleTermsPage({ params }: { params: { locale: string } }) {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale
  const c = termsContent[locale] ?? termsContent.en
  const withLocale = (path: string) => `/${locale}${path}`

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 p-6 py-12">
        <article className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-12 prose prose-invert prose-primary max-w-none">
            <div className="text-center mb-12 not-prose">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
                <FileText size={32} strokeWidth={1.5} className="text-primary-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.title}</h1>
              <p className="text-surface-400">{c.updated}</p>
            </div>

            {/* Disclaimer */}
            <div className="not-prose mb-8 p-6 rounded-xl bg-warning-500/10 border-2 border-warning-500/30">
              <div className="flex items-start gap-4">
                <AlertTriangle size={24} strokeWidth={2} className="text-warning-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-warning-300 mb-2">{c.disclaimer.heading}</h3>
                  <p className="text-sm text-surface-300 leading-relaxed mb-2">
                    <strong>{c.disclaimer.intro}</strong>
                  </p>
                  <ul className="text-sm text-surface-300 space-y-1.5 ml-4 list-disc">
                    {c.disclaimer.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Ad note */}
            <div className="not-prose mb-8 p-6 rounded-xl bg-info-500/10 border border-info-500/30">
              <div className="flex items-start gap-4">
                <Info size={24} strokeWidth={2} className="text-info-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-info-300 mb-2">{c.adNote.heading}</h3>
                  <p className="text-sm text-surface-300 leading-relaxed">{c.adNote.text}</p>
                </div>
              </div>
            </div>

            {/* Sections */}
            {c.sections.map((section) => (
              <div key={section.heading}>
                <h2>{section.heading}</h2>
                {section.content === '' ? null : Array.isArray(section.content) ? (
                  section.heading.includes('3.') || section.heading.includes('4.') || section.heading.includes('Reglas') || section.heading.includes('Règles') || section.heading.includes('Nutzungsregeln') || section.heading.includes('Правила') || section.heading.includes('Regole') || section.heading.includes('Ограничения') || section.heading.includes('Compat') || section.heading.includes('Limitation') || section.heading.includes('Einschrän') || section.heading.includes('Обмеження') ? (
                    <ul>{(section.content as string[]).map((item, i) => <li key={i}>{item}</li>)}</ul>
                  ) : (section.content as string[]).map((p, i) => <p key={i}>{p}</p>)
                ) : <p>{section.content as string}</p>}
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
                  <Link href={withLocale('/privacy-policy')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                    {c.privacyLink}
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
