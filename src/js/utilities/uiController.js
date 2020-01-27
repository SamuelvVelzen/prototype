var uiController = (function() {
    var uiStrings = {
        id: {
            notification: 'notification',
            generateTitle: 'generateTitle',
            generateButton: 'generateArticle',
            conclusionButton: 'conclusion',
            conclusionText: 'conclusion_text',
            hiddenContent: 'hiddenContent',
            animation: 'animation',
            noconclusion: 'noConclusion',
            titleConclusion: 'title_conclusion',
            titleSubConclusion: 'title_sub_conclusion'
        },
        class: {
            filter_item: 'filterbalk_container_item',
            info_item: 'infocard_inner_body_item',
            close: 'close',
            content: 'content'
        },
        style: {
            order: 'flex_order'
        },
        pages: {
            article: 'article.html'
        }
    };

    var content = {
        housemovingdevelopment: `<p class="text">Het ontwikkelingsplan Nieuw Crooswijk heeft zo zijn voor- en nadelen. De buurt wordt opgeknapt en verfrist. Er verschijnen nieuwe huizen, nieuwe winkels, nieuwe tentjes en zelfs nieuwe mensen. Het aantal koopwoningen is in de jaren gestegen ten koste van het aantal huurwoningen. Dit heeft ervoor gezorgd dat er door de jaren heen veel verhuizingen zijn geweest in de wijk. </p><p class="text">Oorspronkelijke bewoners moeten hun huis uit en moeten vaak verhuizen naar een ander huis in een andere wijk. De gerenoveerde en nieuwbouwwoningen trekken meer midden en hoogopgeleiden mensen aan. In Rubroek en Oud Crooswijk gaan de ontwikkelingen qua woonsamenstelling minder snel. In Nieuw Crooswijk is het aantal huishoudens met een hoog inkomen gestegen ten kostte van het aantal huishoudens met een laag en midden hoog inkomen.</p><p class="text">Dat heeft gezorgd voor ontevredenheid onder de oorspronkelijke bewoners. Het gros van de bewoners is van mening dat de wijk op een negatieve manier veranderd is. Het gevoel van saamhorigheid dat de wijk ooit zo kenmerkte, is er vandaag de dag volgens de bewoners niet meer. De volksbuurt is gekrompen en volgens bewoners mist er harmonie tussen de twee groepen. Er is niet tot weinig contact tussen oorspronkelijke Crooswijkers en nieuwe bewoners.  </p><p class="text">Crooswijk is door de jaren heen drastisch veranderd en de komende jaren zullen de gevolgen van het ontwikkelingsplan waarschijnlijk alleen maar blijven toenemen. Crooswijk was in 2016 de armste wijk van Nederland. Tegenwoordig wonen er meer yuppen. Oorspronkelijke bewoners zijn ontevreden over de veranderingen. In de essentie was het doel van de gemeente om de bevolkingssamenstelling in Crooswijk in balans te brengen. De kritische vraag die rijst is: Is Crooswijk er sinds het ontwikkelingsplan op vooruit gegaan? Het ligt maar net aan wie je het vraagt.</p>`,
        movingdevelopment: `<p class="text">Het ontwikkelingsplan in Crooswijk heeft zijn voor- en nadelen. Er verschijnen nieuwe huizen, nieuwe winkels, nieuwe tentjes en zelfs nieuwe mensen. Crooswijkers komen en gaan. Er zijn door de jaren heen veel verhuizingen geweest.</p><p class="text"> Het plan heeft een grote impact gehad op de woonsamenstelling in Crooswijk. Er wonen steeds meer midden en hoogopgeleiden bewoners in Crooswijk. In Rubroek en Oud Crooswijk gaan de ontwikkelingen qua woonsamenstelling minder snel. In Nieuw Crooswijk is het aantal huishoudens met een hoog inkomen gestegen ten kostte van het aantal huishoudens met een laag en midden hoog inkomen. Dat heeft gezorgd voor ontevredenheid onder de oorspronkelijke bewoners. Een groot deel van de oorspronkelijke bewoners vindt dat de wijk op een negatieve manier veranderd is. De volksbuurt is gekrompen en volgens bewoners mist er harmonie tussen de twee groepen.</p><p class="text">Crooswijk is drastisch veranderd en de veranderingen zullen de komende jaren wellicht blijven toenemen. Crooswijk was in 2016 de armste wijk van Nederland. Tegenwoordig wonen er meer yuppen. In de essentie was het doel van de gemeente om de bevolkingssamenstelling in Crooswijk in balans te brengen. Oorspronkelijke bewoners zijn ontevreden over de veranderingen. De kritische vraag die rijst is: Is Crooswijk er sinds het ontwikkelingsplan op vooruit gegaan? Het ligt maar net aan wie je het vraagt</p>`
    };

    return {
        uiStrings: uiStrings,
        content: content
    };
})();
