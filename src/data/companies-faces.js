const excelDataTypes = ['balance', 'fincoeff', 'zvit'];

const companiesFaces = [
  {
    id: 'aeroportlviv',
    shortName: 'Аеропорт Львів',
    usreou: '33073442',
  },
  {
    id: 'agrarfond',
    shortName: 'Аграрний фонд',
    usreou: '38926880',
  },
  {
    id: 'ampu',
    shortName: 'АМПУ',
    usreou: '38727770',
  },
  {
    id: 'arenalviv',
    shortName: 'Арена Львів',
    usreou: '38457291',
  },
  {
    id: 'arsenal',
    shortName: 'Арсенал',
    usreou: '14307357',
  },
  {
    id: 'artemsil',
    shortName: 'Артемсіль',
    usreou: '00379790',
  },
  {
    id: 'berdianskiymtp',
    shortName: 'Бердянський МТП',
    usreou: '01125761',
  },
  {
    id: 'boryspil',
    shortName: 'Аеропорт Бориспіль',
    usreou: '20572069',
  },
  {
    id: 'buddyrektsiia',
    shortName: 'Буддирекція',
    usreou: '00179737',
  },
  {
    id: 'centrenergo',
    shortName: 'Центренерго',
    usreou: '22927045',
  },
  {
    id: 'chaes',
    shortName: 'ЧАЕС',
    usreou: '14310862',
  },
  {
    id: 'dakavtodorogi',
    shortName: 'Автодороги України',
    usreou: '31899285',
  },
  {
    id: 'derzhaviappukraina',
    shortName: 'ДАП Україна',
    usreou: '25196197',
  },
  {
    id: 'derzhgidrographiya',
    shortName: 'Держгідрографія',
    usreou: '21720000',
  },
  {
    id: 'derzhinvestkompaniya',
    shortName: 'Держінвесткомпанія',
    usreou: '37176130',
  },
  {
    id: 'derzhipotechustanova',
    shortName: 'Державна іпотечна установа',
    usreou: '33304730',
  },
  {
    id: 'derzhvuglepostach',
    shortName: 'Держвуглепостач',
    usreou: '40225511',
  },
  {
    id: 'devz',
    shortName: 'ДЕВЗ',
    usreou: '32495626',
  },
  {
    id: 'diprozvjazok',
    shortName: 'Діпрозв’язок',
    usreou: '01168185',
  },
  {
    id: 'dniprovskatets',
    shortName: 'Дніпровська ТЕЦ',
    usreou: '00130820',
  },
  {
    id: 'dpzku',
    shortName: 'ДПЗКУ',
    usreou: '37243279',
  },
  {
    id: 'dyrbudaeroportodesa',
    shortName: 'ДБ Аеропорту Одеса',
    usreou: '38054466',
  },
  {
    id: 'electrovazhmash',
    shortName: 'Електроважмаш',
    usreou: '00213121',
  },
  {
    id: 'energoatom',
    shortName: 'Енергоатом',
    usreou: '24584661',
  },
  {
    id: 'energorynok',
    shortName: 'Енергоринок',
    usreou: '21515381',
  },
  {
    id: 'expocentrua',
    shortName: 'Експоцентр України',
    usreou: '21710384',
  },
  {
    id: 'fininpro',
    shortName: 'Фінінпро',
    usreou: '37264503',
  },
  {
    id: 'gdip',
    shortName: 'ГДІП',
    usreou: '04013583',
  },
  {
    id: 'izmailskyimtp',
    shortName: 'Ізмаїльский МТП',
    usreou: '01125815',
  },
  {
    id: 'kaluskatetsnova',
    shortName: 'Калуська ТЕЦ-нова',
    usreou: '40885849',
  },
  {
    id: 'kbpivdenne',
    shortName: 'КБ Південне',
    usreou: '14308304',
  },
  {
    id: 'kgzkordyrektsiia',
    shortName: 'КГЗКОР Дирекція',
    usreou: '04853709',
  },
  {
    id: 'kharkivoblenergo',
    shortName: 'Харківобленерго',
    usreou: '00131954',
  },
  {
    id: 'khartron',
    shortName: 'Хартрон',
    usreou: '14313062',
  },
  {
    id: 'khersonskatets',
    shortName: 'Херсонська ТЕЦ',
    usreou: '00131771',
  },
  {
    id: 'khmelnytskoblenergo',
    shortName: 'Хмельницькобленерго',
    usreou: '22767506',
  },
  {
    id: 'komunar',
    shortName: 'Комунар',
    usreou: '14308730',
  },
  {
    id: 'konchazaspa',
    shortName: 'Конча-Заспа',
    usreou: '01981715',
  },
  {
    id: 'konyarstvoua',
    shortName: 'Конярство України',
    usreou: '37404165',
  },
  {
    id: 'krivoryzteplocentral',
    shortName: 'Криворіжтеплоцентраль',
    usreou: '00130850',
  },
  {
    id: 'kryvbaspromvodopostachannia',
    shortName: 'Кривбаспромводопостач',
    usreou: '00191017',
  },
  {
    id: 'kyivdniprovskemppzt',
    shortName: 'Київ-Дніпровське МППЗТ',
    usreou: '04737111',
  },
  {
    id: 'lisichanskvug',
    shortName: 'Лисичанськвугілля',
    usreou: '32359108',
  },
  {
    id: 'lvivvug',
    shortName: 'Львіввугілля',
    usreou: '32323256',
  },
  {
    id: 'mariupolskiymtp',
    shortName: 'Маріупольский МТП',
    usreou: '01125755',
  },
  {
    id: 'molodagvardiya',
    shortName: 'Молода Гвардія',
    usreou: '33636307',
  },
  {
    id: 'mtpchornomorsk',
    shortName: 'МТП Чорноморськ',
    usreou: '01125672',
  },
  {
    id: 'mtpyuzhnyi',
    shortName: 'МТП Южний',
    usreou: '04704790',
  },
  {
    id: 'mykolaivvug',
    shortName: 'Миколаїввугілля',
    usreou: '23399393',
  },
  {
    id: 'myrnogradvug',
    shortName: 'Мирноградвугілля',
    usreou: '32087941',
  },
  {
    id: 'mystetskyiarsenal',
    shortName: 'Мистецький арсенал',
    usreou: '33403498',
  },
  {
    id: 'nadraukrainy',
    shortName: 'Надра України',
    usreou: '31169745',
  },
  {
    id: 'naftogaz',
    shortName: 'Нафтогаз',
    usreou: '20077720',
  },
  {
    id: 'ncsolimpiyskiy',
    shortName: 'НСК Олімпійський',
    usreou: '14297707',
  },
  {
    id: 'nstu',
    shortName: 'НСТУ',
    usreou: '23152907',
  },
  {
    id: 'odeskiymtp',
    shortName: 'Одеський МТП',
    usreou: '01125666',
  },
  {
    id: 'oghk',
    shortName: 'ОГХК',
    usreou: '36716128',
  },
  {
    id: 'opz',
    shortName: 'ОПЗ',
    usreou: '00206539',
  },
  {
    id: 'palatsukraina',
    shortName: 'Палац Україна',
    usreou: '02221461',
  },
  {
    id: 'pavlogradkhimzavod',
    shortName: 'Павлоградхімзавод',
    usreou: '14310112',
  },
  {
    id: 'pershyikyivskyimashzavod',
    shortName: 'Перший київський машзавод',
    usreou: '14308569',
  },
  {
    id: 'pervomaiskvug',
    shortName: 'Первомайськвугілля',
    usreou: '32320594',
  },
  {
    id: 'pivdenmash',
    shortName: 'Південмаш',
    usreou: '14308368',
  },
  {
    id: 'pivdennodonbaske',
    shortName: 'Південнодонбаське',
    usreou: '34032208',
  },
  {
    id: 'poligrafkombinatukraina',
    shortName: 'Поліграфкомбінат Україна',
    usreou: '16286441',
  },
  {
    id: 'prezidentotel',
    shortName: 'Президент-готель',
    usreou: '30058128',
  },
  {
    id: 'regelmerezhi',
    shortName: 'Регіональні електромережі',
    usreou: '32402870',
  },
  {
    id: 'rrtconcern',
    shortName: 'Концерн РРТ',
    usreou: '01190043',
  },
  {
    id: 'selydivvug',
    shortName: 'Селидіввугілля',
    usreou: '33426253',
  },
  {
    id: 'severodonetskatets',
    shortName: 'Северодонецька ТЕЦ',
    usreou: '00131050',
  },
  {
    id: 'shakhtaimsurgaya',
    shortName: 'Шахта ім. Сургая',
    usreou: '40695853',
  },
  {
    id: 'skhidgzk',
    shortName: 'Східний ГЗК',
    usreou: '14309787',
  },
  {
    id: 'skolviya',
    shortName: 'СК Ольвія',
    usreou: '19290012',
  },
  {
    id: 'sportkompleksatlet',
    shortName: 'Спорткомплекс Атлет',
    usreou: '39351532',
  },
  {
    id: 'ternopiloblenergo',
    shortName: 'Тернопільобленерго',
    usreou: '00130725',
  },
  {
    id: 'toretskvug',
    shortName: 'Торецьквугілля',
    usreou: '33839013',
  },
  {
    id: 'turboatom',
    shortName: 'Турбоатом',
    usreou: '05762269',
  },
  {
    id: 'udp',
    shortName: 'УДП',
    usreou: '01125821',
  },
  {
    id: 'udtsr',
    shortName: 'УДЦ Радіочастот',
    usreou: '01181765',
  },
  {
    id: 'ukraerorukh',
    shortName: 'Украерорух',
    usreou: '19477064',
  },
  {
    id: 'ukragrolizing',
    shortName: 'Украгролізинг',
    usreou: '30401456',
  },
  {
    id: 'ukrbud',
    shortName: 'Укрбуд',
    usreou: '33298371',
  },
  {
    id: 'ukrenergo',
    shortName: 'Укренерго',
    usreou: '00100227',
  },
  {
    id: 'ukrgeofizyka',
    shortName: 'Укргеофізика',
    usreou: '01432761',
  },
  {
    id: 'ukrgidroenergo',
    shortName: 'Укргідроенерго',
    usreou: '20588716',
  },
  {
    id: 'ukrkhimtransamiak',
    shortName: 'Укрхімтрансаміак',
    usreou: '31517060',
  },
  {
    id: 'ukrkosmos',
    shortName: 'Укркосмос',
    usreou: '24381357',
  },
  {
    id: 'ukrmetrteststandart',
    shortName: 'Укрметртестстандарт',
    usreou: '02568182',
  },
  {
    id: 'ukrpatent',
    shortName: 'Укрпатент',
    usreou: '31032378',
  },
  {
    id: 'ukrposhta',
    shortName: 'Укрпошта',
    usreou: '21560045',
  },
  {
    id: 'ukrservismintransu',
    shortName: 'Укрсервіс Мінтрансу',
    usreou: '30218246',
  },
  {
    id: 'ukrspirt',
    shortName: 'ДП Укрспирт',
    usreou: '37199618',
  },
  {
    id: 'ukrspirtconcern',
    shortName: 'Концерн Укрспирт',
    usreou: '03081223',
  },
  {
    id: 'ukrvydavpoligrafiya',
    shortName: 'Укрвидавполіграфія',
    usreou: '21661711',
  },
  {
    id: 'ukrzaliznytsia',
    shortName: 'Укрзалізниця',
    usreou: '40075815',
  },
  {
    id: 'ukrzhitloservis',
    shortName: 'Укржитлосервіс',
    usreou: '32207896',
  },
  {
    id: 'vugcompkrasnolymanska',
    shortName: 'Краснолиманська',
    usreou: '31599557',
  },
  {
    id: 'zalofitsdelegatsiy',
    shortName: 'Зал офіційний делегацій',
    usreou: '26191463',
  },
  {
    id: 'zaporizhoblenergo',
    shortName: 'Запоріжжяобленерго',
    usreou: '00130926',
  },
  {
    id: 'ztmk',
    shortName: 'ЗТМК',
    usreou: '38983006',
  },
];

exports.excelDataTypes = excelDataTypes;
exports.companiesFaces = companiesFaces;
