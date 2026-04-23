-- =============================================
-- SEED DATA - Placeholder content
-- Run this in Supabase SQL Editor
-- =============================================

-- SERVICES
INSERT INTO services (slug, name, short_description, description, category, is_featured, order_index) VALUES
('opci-pregled',
 '{"hr-HR": "Opći pregled", "en-US": "General Checkup", "de-DE": "Allgemeine Untersuchung"}',
 '{"hr-HR": "Kompletan zdravstveni pregled za procjenu vašeg općeg zdravstvenog stanja.", "en-US": "Complete health examination to assess your overall health status.", "de-DE": "Vollständige Gesundheitsuntersuchung zur Beurteilung Ihres allgemeinen Gesundheitszustands."}',
 '{"hr-HR": "Naš opći pregled uključuje detaljnu analizu vašeg zdravstvenog stanja, laboratorijske pretrage i konzultacije sa specijalistom.", "en-US": "Our general checkup includes detailed health analysis, laboratory tests and specialist consultation.", "de-DE": "Unsere allgemeine Untersuchung umfasst eine detaillierte Gesundheitsanalyse, Labortests und Facharztberatung."}',
 'preventive', true, 1),

('kardiologija',
 '{"hr-HR": "Kardiologija", "en-US": "Cardiology", "de-DE": "Kardiologie"}',
 '{"hr-HR": "Specijalistički pregled srca i krvožilnog sustava.", "en-US": "Specialist examination of heart and cardiovascular system.", "de-DE": "Fachärztliche Untersuchung von Herz und Kreislaufsystem."}',
 '{"hr-HR": "Naš kardiološki tim koristi najmoderniju opremu za dijagnostiku i liječenje srčanih bolesti. Uključuje EKG, ultrazvuk srca i holter monitoring.", "en-US": "Our cardiology team uses state-of-the-art equipment for diagnosis and treatment of heart diseases. Includes ECG, heart ultrasound and holter monitoring.", "de-DE": "Unser Kardiologie-Team verwendet modernste Geräte für Diagnose und Behandlung von Herzerkrankungen."}',
 'specialist', true, 2),

('ginekologija',
 '{"hr-HR": "Ginekologija", "en-US": "Gynecology", "de-DE": "Gynäkologie"}',
 '{"hr-HR": "Preventivni i specijalistički ginekološki pregledi.", "en-US": "Preventive and specialist gynecological examinations.", "de-DE": "Präventive und fachärztliche gynäkologische Untersuchungen."}',
 '{"hr-HR": "Kompletan ginekološki pregled uključuje PAPA test, ultrazvuk i konzultacije. Brinemo o zdravlju žena svih životnih dobi.", "en-US": "Complete gynecological examination includes PAP test, ultrasound and consultations. We care for women health at all ages.", "de-DE": "Vollständige gynäkologische Untersuchung umfasst PAP-Test, Ultraschall und Beratungen."}',
 'specialist', true, 3),

('dermatologija',
 '{"hr-HR": "Dermatologija", "en-US": "Dermatology", "de-DE": "Dermatologie"}',
 '{"hr-HR": "Pregled i liječenje kožnih bolesti i estetski tretmani.", "en-US": "Examination and treatment of skin diseases and aesthetic treatments.", "de-DE": "Untersuchung und Behandlung von Hautkrankheiten und ästhetische Behandlungen."}',
 '{"hr-HR": "Naši dermatolozi pružaju usluge pregleda madeža, liječenja akni, ekcema i drugih kožnih stanja, kao i estetske tretmane.", "en-US": "Our dermatologists provide mole examination, treatment of acne, eczema and other skin conditions, as well as aesthetic treatments.", "de-DE": "Unsere Dermatologen bieten Muttermaluntersuchungen, Behandlung von Akne, Ekzemen und anderen Hautzuständen sowie ästhetische Behandlungen."}',
 'aesthetic', false, 4),

('laboratorij',
 '{"hr-HR": "Laboratorijska dijagnostika", "en-US": "Laboratory Diagnostics", "de-DE": "Labordiagnostik"}',
 '{"hr-HR": "Širok spektar laboratorijskih pretraga s brzim rezultatima.", "en-US": "Wide range of laboratory tests with fast results.", "de-DE": "Breites Spektrum an Labortests mit schnellen Ergebnissen."}',
 '{"hr-HR": "Naš laboratorij nudi kompletnu krvnu sliku, biokemijske pretrage, hormone, tumorske markere i mnoge druge analize.", "en-US": "Our laboratory offers complete blood count, biochemical tests, hormones, tumor markers and many other analyses.", "de-DE": "Unser Labor bietet komplettes Blutbild, biochemische Tests, Hormone, Tumormarker und viele andere Analysen."}',
 'diagnostics', true, 5);

-- DOCTORS
INSERT INTO doctors (slug, name, title, specialty, bio, credentials, is_featured, order_index) VALUES
('ivan-horvat',
 'Dr. Ivan Horvat',
 '{"hr-HR": "dr. med., spec. interne medicine", "en-US": "MD, Internal Medicine Specialist", "de-DE": "Dr. med., Facharzt für Innere Medizin"}',
 '{"hr-HR": "Interna medicina", "en-US": "Internal Medicine", "de-DE": "Innere Medizin"}',
 '{"hr-HR": "Dr. Horvat ima preko 15 godina iskustva u internoj medicini. Specijalizirao se na KBC Zagreb i usavršavao u Beču.", "en-US": "Dr. Horvat has over 15 years of experience in internal medicine. He specialized at KBC Zagreb and trained in Vienna.", "de-DE": "Dr. Horvat verfügt über mehr als 15 Jahre Erfahrung in der Inneren Medizin."}',
 '["Specijalizacija iz interne medicine", "Subspecijalizacija iz kardiologije", "Europski certifikat iz kardiologije"]',
 true, 1),

('ana-matic',
 'Dr. Ana Matić',
 '{"hr-HR": "dr. med., spec. ginekologije", "en-US": "MD, Gynecology Specialist", "de-DE": "Dr. med., Fachärztin für Gynäkologie"}',
 '{"hr-HR": "Ginekologija i opstetricija", "en-US": "Gynecology and Obstetrics", "de-DE": "Gynäkologie und Geburtshilfe"}',
 '{"hr-HR": "Dr. Matić je iskusna ginekologinja s posebnim interesom za minimalnu invazivnu kirurgiju i reproduktivnu medicinu.", "en-US": "Dr. Matić is an experienced gynecologist with special interest in minimally invasive surgery and reproductive medicine.", "de-DE": "Dr. Matić ist eine erfahrene Gynäkologin mit besonderem Interesse an minimal-invasiver Chirurgie."}',
 '["Specijalizacija iz ginekologije", "Subspecijalizacija iz reproduktivne medicine", "ESHRE certifikat"]',
 true, 2),

('marko-kovac',
 'Dr. Marko Kovač',
 '{"hr-HR": "dr. med., spec. dermatologije", "en-US": "MD, Dermatology Specialist", "de-DE": "Dr. med., Facharzt für Dermatologie"}',
 '{"hr-HR": "Dermatologija i venerologija", "en-US": "Dermatology and Venereology", "de-DE": "Dermatologie und Venerologie"}',
 '{"hr-HR": "Dr. Kovač je specijalist dermatologije s fokusom na dermatoskopiju i rano otkrivanje melanoma.", "en-US": "Dr. Kovač is a dermatology specialist focusing on dermatoscopy and early melanoma detection.", "de-DE": "Dr. Kovač ist Dermatologe mit Schwerpunkt auf Dermatoskopie und Früherkennung von Melanomen."}',
 '["Specijalizacija iz dermatologije", "Certifikat iz dermatoskopije", "Član Europske akademije za dermatologiju"]',
 true, 3);

-- POSTS
INSERT INTO posts (slug, title, excerpt, content, category, is_published, is_featured, published_at, views) VALUES
('vaznost-preventivnih-pregleda',
 '{"hr-HR": "Važnost redovitih preventivnih pregleda", "en-US": "Importance of Regular Preventive Checkups", "de-DE": "Wichtigkeit regelmäßiger Vorsorgeuntersuchungen"}',
 '{"hr-HR": "Saznajte zašto su redoviti preventivni pregledi ključni za očuvanje vašeg zdravlja.", "en-US": "Learn why regular preventive checkups are key to maintaining your health.", "de-DE": "Erfahren Sie, warum regelmäßige Vorsorgeuntersuchungen für Ihre Gesundheit wichtig sind."}',
 '{"hr-HR": "## Zašto su preventivni pregledi važni?\n\nRedoviti preventivni pregledi omogućuju rano otkrivanje bolesti kada su najlakše za liječenje. Preporučujemo godišnji pregled za sve odrasle osobe.\n\n### Što uključuje preventivni pregled?\n\n- Kompletan krvni nalaz\n- Mjerenje tlaka\n- EKG\n- Pregled specijalista\n\nNe čekajte simptome - preventiva je najbolji lijek!", "en-US": "## Why are preventive checkups important?\n\nRegular preventive checkups allow early detection of diseases when they are easiest to treat.", "de-DE": "## Warum sind Vorsorgeuntersuchungen wichtig?\n\nRegelmäßige Vorsorgeuntersuchungen ermöglichen die Früherkennung von Krankheiten."}',
 'Zdravlje', true, true, NOW(), 124),

('kako-se-pripremiti-za-pregled',
 '{"hr-HR": "Kako se pripremiti za liječnički pregled", "en-US": "How to Prepare for a Medical Checkup", "de-DE": "Wie Sie sich auf eine ärztliche Untersuchung vorbereiten"}',
 '{"hr-HR": "Praktični savjeti za pripremu prije dolaska na pregled.", "en-US": "Practical tips for preparation before your examination.", "de-DE": "Praktische Tipps zur Vorbereitung vor Ihrer Untersuchung."}',
 '{"hr-HR": "## Priprema za pregled\n\nDobra priprema osigurava točnije rezultate i učinkovitiji pregled.\n\n### Prije pregleda:\n\n1. Donesite listu lijekova koje uzimate\n2. Pripremite pitanja za liječnika\n3. Za krvne pretrage - natašte\n4. Donesite prethodne nalaze\n\n### Na dan pregleda\n\nDođite 15 minuta ranije kako biste imali vremena za prijavu.", "en-US": "## Preparation for examination\n\nGood preparation ensures more accurate results.", "de-DE": "## Vorbereitung auf die Untersuchung\n\nEine gute Vorbereitung sorgt für genauere Ergebnisse."}',
 'Savjeti', true, false, NOW(), 87),

('nova-oprema-u-poliklinici',
 '{"hr-HR": "Nova dijagnostička oprema u našoj poliklinici", "en-US": "New Diagnostic Equipment in Our Clinic", "de-DE": "Neue diagnostische Geräte in unserer Klinik"}',
 '{"hr-HR": "Predstavljamo najnoviju medicinsku opremu za još preciznije dijagnoze.", "en-US": "Introducing the latest medical equipment for even more precise diagnoses.", "de-DE": "Wir stellen die neuesten medizinischen Geräte für noch präzisere Diagnosen vor."}',
 '{"hr-HR": "## Ulaganje u vašu sigurnost\n\nS ponosom predstavljamo novu generaciju dijagnostičke opreme koja nam omogućuje još preciznije i brže dijagnoze.\n\n### Nova oprema uključuje:\n\n- 4D ultrazvuk\n- Digitalni rendgen\n- Moderan EKG uređaj\n- Napredni laboratorijski analizatori", "en-US": "## Investment in your safety\n\nWe proudly present new generation diagnostic equipment.", "de-DE": "## Investition in Ihre Sicherheit\n\nWir präsentieren stolz die neue Generation diagnostischer Geräte."}',
 'Novosti', true, true, NOW(), 203);

-- TESTIMONIALS
INSERT INTO testimonials (author_name, content, rating, is_approved, is_featured) VALUES
('Marija P.',
 '{"hr-HR": "Izuzetno profesionalna usluga. Dr. Horvat je bio vrlo temeljit i strpljiv. Preporučujem svima!", "en-US": "Extremely professional service. Dr. Horvat was very thorough and patient. I recommend to everyone!", "de-DE": "Äußerst professioneller Service. Dr. Horvat war sehr gründlich und geduldig."}',
 5, true, true),

('Ivan K.',
 '{"hr-HR": "Brza dijagnostika i ljubazno osoblje. Osjećao sam se ugodno tijekom cijelog pregleda.", "en-US": "Fast diagnostics and friendly staff. I felt comfortable throughout the examination.", "de-DE": "Schnelle Diagnostik und freundliches Personal."}',
 5, true, true),

('Ana S.',
 '{"hr-HR": "Konačno sam pronašla polikliniku kojoj mogu vjerovati. Moderna oprema i stručni tim.", "en-US": "Finally found a clinic I can trust. Modern equipment and expert team.", "de-DE": "Endlich habe ich eine Klinik gefunden, der ich vertrauen kann."}',
 5, true, false),

('Petar M.',
 '{"hr-HR": "Zadovoljan sam s brzinom dobivanja rezultata i detaljnim objašnjenjima liječnika.", "en-US": "Satisfied with the speed of getting results and detailed explanations from the doctor.", "de-DE": "Zufrieden mit der Schnelligkeit der Ergebnisse und den detaillierten Erklärungen."}',
 4, true, false);

-- FAQS
INSERT INTO faqs (question, answer, category, order_index) VALUES
('{"hr-HR": "Kako mogu zakazati pregled?", "en-US": "How can I schedule an appointment?", "de-DE": "Wie kann ich einen Termin vereinbaren?"}',
 '{"hr-HR": "Pregled možete zakazati telefonom, putem kontakt forme na web stranici ili osobno u našoj poliklinici. Radno vrijeme za naručivanje je od 8:00 do 20:00.", "en-US": "You can schedule an appointment by phone, through the contact form on our website, or in person at our clinic. Booking hours are from 8:00 to 20:00.", "de-DE": "Sie können einen Termin telefonisch, über das Kontaktformular auf unserer Website oder persönlich in unserer Klinik vereinbaren."}',
 'Opće', 1),

('{"hr-HR": "Trebam li doći natašte na vađenje krvi?", "en-US": "Do I need to fast before blood tests?", "de-DE": "Muss ich vor Blutuntersuchungen nüchtern sein?"}',
 '{"hr-HR": "Za većinu laboratorijskih pretraga potrebno je biti natašte 8-12 sati. Vodu možete piti. Za specifične pretrage dobit ćete detaljne upute pri naručivanju.", "en-US": "For most laboratory tests, you need to fast for 8-12 hours. You can drink water. For specific tests, you will receive detailed instructions when booking.", "de-DE": "Für die meisten Labortests müssen Sie 8-12 Stunden nüchtern sein. Sie können Wasser trinken."}',
 'Pretrage', 2),

('{"hr-HR": "Primate li zdravstveno osiguranje?", "en-US": "Do you accept health insurance?", "de-DE": "Akzeptieren Sie Krankenversicherung?"}',
 '{"hr-HR": "Da, surađujemo s HZZO-om i većinom dopunskih osiguranja. Molimo vas da pri dolasku ponesete zdravstvenu iskaznicu i karticu dopunskog osiguranja.", "en-US": "Yes, we work with HZZO and most supplementary insurances. Please bring your health card and supplementary insurance card when you arrive.", "de-DE": "Ja, wir arbeiten mit HZZO und den meisten Zusatzversicherungen zusammen."}',
 'Plaćanje', 3),

('{"hr-HR": "Koliko traje čekanje na rezultate?", "en-US": "How long is the wait for results?", "de-DE": "Wie lange muss man auf Ergebnisse warten?"}',
 '{"hr-HR": "Vrijeme čekanja ovisi o vrsti pretrage. Osnovne krvne pretrage su gotove isti dan, dok specijalizirane pretrage mogu trajati 3-5 radnih dana.", "en-US": "Wait time depends on the type of test. Basic blood tests are ready the same day, while specialized tests may take 3-5 business days.", "de-DE": "Die Wartezeit hängt von der Art des Tests ab."}',
 'Pretrage', 4);

-- GALLERY
INSERT INTO gallery (image_url, caption, category, is_featured, order_index) VALUES
('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800', '{"hr-HR": "Recepcija poliklinike", "en-US": "Clinic reception", "de-DE": "Klinikrezeption"}', 'Interijer', true, 1),
('https://images.unsplash.com/photo-1551076805-e1869033e561?w=800', '{"hr-HR": "Moderna dijagnostička oprema", "en-US": "Modern diagnostic equipment", "de-DE": "Moderne diagnostische Geräte"}', 'Oprema', true, 2),
('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800', '{"hr-HR": "Laboratorij", "en-US": "Laboratory", "de-DE": "Labor"}', 'Oprema', false, 3),
('https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800', '{"hr-HR": "Čekaonica", "en-US": "Waiting room", "de-DE": "Wartezimmer"}', 'Interijer', false, 4);

-- JOB POSTINGS
INSERT INTO job_postings (slug, title, department, employment_type, location, description, is_active) VALUES
('medicinska-sestra',
 '{"hr-HR": "Medicinska sestra/tehničar", "en-US": "Nurse", "de-DE": "Krankenschwester/Pfleger"}',
 'Medicina',
 'full-time',
 '{"hr-HR": "Zagreb, Hrvatska", "en-US": "Zagreb, Croatia", "de-DE": "Zagreb, Kroatien"}',
 '{"hr-HR": "Tražimo iskusnu medicinsku sestru za rad u našoj poliklinici. Nudimo konkurentnu plaću, edukacije i ugodno radno okruženje.", "en-US": "We are looking for an experienced nurse to work in our clinic. We offer competitive salary, education and pleasant work environment.", "de-DE": "Wir suchen eine erfahrene Krankenschwester für die Arbeit in unserer Klinik."}',
 true),

('lijecnik-opce-prakse',
 '{"hr-HR": "Liječnik opće prakse", "en-US": "General Practitioner", "de-DE": "Allgemeinmediziner"}',
 'Medicina',
 'full-time',
 '{"hr-HR": "Zagreb, Hrvatska", "en-US": "Zagreb, Croatia", "de-DE": "Zagreb, Kroatien"}',
 '{"hr-HR": "Pridružite se našem timu kao liječnik opće prakse. Tražimo motiviranu osobu s položenim stručnim ispitom.", "en-US": "Join our team as a general practitioner. We are looking for a motivated person with a passed professional exam.", "de-DE": "Treten Sie unserem Team als Allgemeinmediziner bei."}',
 true);
