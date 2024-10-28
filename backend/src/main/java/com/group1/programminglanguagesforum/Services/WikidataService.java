package com.group1.programminglanguagesforum.Services;
public class WikidataService{
String queryString =
        """
        PREFIX wdt: <http://www.wikidata.org/prop/direct/>
        PREFIX wd: <http://www.wikidata.org/entity/>
        PREFIX wikibase: <http://wikiba.se/ontology#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX schema: <http://schema.org/>
    
        SELECT DISTINCT ?language 
            (SAMPLE(?languageLabel) AS ?languageLabelS) 
            (SAMPLE(?description) AS ?descriptionS) 
            (SAMPLE(?logoImage) AS ?logoImageS)
            (SAMPLE(?authorLabel) AS ?authorS)
            (SAMPLE(YEAR(?inceptionYear)) AS ?inceptionYearS)
            (SAMPLE(?fileExtension) AS ?fileExtensionS)
        WHERE {
            ?language wdt:P31 ?class;
                    wdt:P154 ?logoImage.

            # Include both programming languages and scripting languages
            VALUES ?class { wd:Q9143 wd:Q12772052 }

            OPTIONAL {
                ?language schema:description ?description.
                FILTER((LANG(?description)) = "en")
            }

            OPTIONAL {
                ?language rdfs:label ?languageLabel.
                FILTER((LANG(?languageLabel)) = "en")
            }

            OPTIONAL {
                ?language wdt:P178 ?author.
                ?author rdfs:label ?authorLabel.
                FILTER((LANG(?authorLabel)) = "en")
            }
            
            OPTIONAL {
                ?language wdt:P571 ?inceptionYear.
            }
            
            OPTIONAL {
                ?language wdt:P1195 ?fileExtension.
            }
        }
        GROUP BY ?language
        HAVING (BOUND(?languageLabelS))




        SELECT DISTINCT ?paradigm 
            (SAMPLE(?paradigmLabel) AS ?paradigmLabelS) 
            (SAMPLE(?description) AS ?descriptionS) 
            (SAMPLE(?stackExchangeTag) AS ?stackExchangeTagS)

        WHERE {
            ?paradigm wdt:P31 wd:Q188267.

            OPTIONAL {
                ?paradigm schema:description ?description.
                FILTER((LANG(?description)) = "en") 
            }

            OPTIONAL {
                ?paradigm rdfs:label ?paradigmLabel.
                FILTER((LANG(?paradigmLabel)) = "en") 
            }

            OPTIONAL {
                ?paradigm wdt:P1482 ?stackExchangeTag. 
            }
        }
        GROUP BY ?paradigm
        HAVING (BOUND(?paradigmLabelS))


        """;
}