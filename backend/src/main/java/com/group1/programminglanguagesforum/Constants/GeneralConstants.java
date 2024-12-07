package com.group1.programminglanguagesforum.Constants;

public class GeneralConstants {
    public static class SparqlConstants {
        public static final String USER_AGENT = "Wikidata RDF4J Java Example/0.1 (https://query.wikidata.org/)";
        public static final String SOFTWARE_LIBRARY_QUERY = """
                        SELECT DISTINCT ?library
                        (SAMPLE(?libraryLabel) AS ?libraryLabelS)\s
                        (SAMPLE(?description) AS ?descriptionS)\s
                        (SAMPLE(?logoImage) AS ?logoImageS)\s
                        (SAMPLE(?officialWebSite) AS ?officialWebSiteS)\s
                        (SAMPLE(?stackExchangeTag) AS ?stackExchangeTagS)
                    WHERE {
                        ?library wdt:P31 wd:Q188860.
                        
                        FILTER (
                            EXISTS { ?library wdt:P154 ?logoImage }
                        )
                        FILTER (
                            EXISTS { ?library wdt:P856 ?officialWebSite }
                        )

                        OPTIONAL { ?library wdt:P154 ?logoImage }
                        OPTIONAL { ?library wdt:P856 ?officialWebSite }
                        OPTIONAL { ?library wdt:P1482 ?stackExchangeTag }

                        OPTIONAL {
                            ?library schema:description ?description.
                            FILTER((LANG(?description)) = "en")\s
                        }
                        OPTIONAL {
                            ?library rdfs:label ?libraryLabel.
                            FILTER((LANG(?libraryLabel)) = "en")\s
                        }
                    }
                    GROUP BY ?library
                    HAVING (BOUND(?libraryLabelS))
                """;
        
        public static final String PROGRAMMING_PARADIGM_QUERY = """
                 SELECT DISTINCT ?paradigm\s
                            (SAMPLE(?paradigmLabel) AS ?paradigmLabelS)\s
                            (SAMPLE(?description) AS ?descriptionS)\s
                            (SAMPLE(?stackExchangeTag) AS ?stackExchangeTagS)

                        WHERE {
                            ?paradigm wdt:P31 wd:Q188267.

                            OPTIONAL {
                                ?paradigm schema:description ?description.
                                FILTER((LANG(?description)) = "en")\s
                            }

                            OPTIONAL {
                                ?paradigm rdfs:label ?paradigmLabel.
                                FILTER((LANG(?paradigmLabel)) = "en")\s
                            }

                            OPTIONAL {
                                ?paradigm wdt:P1482 ?stackExchangeTag.\s
                            }
                        }
                        GROUP BY ?paradigm
                        HAVING (BOUND(?paradigmLabelS))\
                """;
        public static final String COMPUTER_SCIENCE_TERM_QUERY = """
                    SELECT DISTINCT ?term\s
                               (SAMPLE(?termLabel) AS ?termLabelS)\s
                               (SAMPLE(?description) AS ?descriptionS)\s
                               (SAMPLE(?stackExchangeTag) AS ?stackExchangeTagS)
   
                           WHERE {
                               ?term wdt:P31 wd:Q66747126.
   
                               OPTIONAL {
                                   ?term schema:description ?description.
                                   FILTER((LANG(?description)) = "en")\s
                               }
   
                               OPTIONAL {
                                   ?term rdfs:label ?termLabel.
                                   FILTER((LANG(?termLabel)) = "en")\s
                               }
   
                               OPTIONAL {
                                   ?term wdt:P1482 ?stackExchangeTag.\s
                               }
                           }
                           GROUP BY ?term
                           HAVING (BOUND(?termLabelS))\
                   """;
        public static final String PROGRAMMING_LANGUAGES_QUERY =
                """
                        SELECT DISTINCT ?language\s
                            (SAMPLE(?languageLabel) AS ?languageLabelS)\s
                            (SAMPLE(?description) AS ?descriptionS)\s
                            (SAMPLE(?logoImage) AS ?logoImageS)
                            (SAMPLE(?authorLabel) AS ?authorS)
                            (SAMPLE(?inceptionYear) AS ?inceptionYearS)
                            (SAMPLE(?fileExtension) AS ?fileExtensionS)
                            (SAMPLE(?officialWebSite) AS ?officialWebSiteS)
                            (SAMPLE(?stackExchangeTag) AS ?stackExchangeTagS)
                        WHERE {
                            {
                                ?language wdt:P31 wd:Q9143.  # programming language
                            }
                            UNION
                            {
                                ?language wdt:P31 wd:Q12772052.  # scripting language
                            }
                            UNION
                            {
                                ?language wdt:P31 wd:Q899523.  # object-based language
                            }
                           \s
                            FILTER (
                                EXISTS { ?language wdt:P154 ?logoImage }\s
                            )
                            FILTER (
                                EXISTS { ?language wdt:P856 ?officialWebSite }\s
                            )

                            OPTIONAL { ?language wdt:P154 ?logoImage }
                            OPTIONAL { ?language wdt:P856 ?officialWebSite }
                            OPTIONAL { ?language wdt:P1482 ?stackExchangeTag }

                            OPTIONAL {
                                ?language schema:description ?description.
                                FILTER((LANG(?description)) = "en")
                            }
                         \s
                            OPTIONAL {
                                ?language rdfs:label ?languageLabel.
                                FILTER((LANG(?languageLabel)) = "en")
                            }

                            OPTIONAL {
                                ?language wdt:P178 ?author.
                                ?author rdfs:label ?authorLabel.
                                FILTER((LANG(?authorLabel)) = "en")
                            }
                           \s
                            OPTIONAL { ?language wdt:P571 ?inceptionYear }
                           \s
                            OPTIONAL { ?language wdt:P1195 ?fileExtension }
                        }
                        GROUP BY ?language
                        HAVING (BOUND(?languageLabelS))
                        """;
    }
}
