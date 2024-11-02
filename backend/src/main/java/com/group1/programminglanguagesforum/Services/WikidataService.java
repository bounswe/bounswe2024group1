package com.group1.programminglanguagesforum.Services;

import com.group1.programminglanguagesforum.Constants.EndpointConstants;
import com.group1.programminglanguagesforum.Constants.GeneralConstants;
import com.group1.programminglanguagesforum.Entities.ProgrammingLanguagesTag;
import com.group1.programminglanguagesforum.Entities.ProgrammingParadigmTag;
import com.group1.programminglanguagesforum.Entities.ComputerScienceTermTag;
import com.group1.programminglanguagesforum.Entities.SoftwareLibraryTag;
import com.group1.programminglanguagesforum.Repositories.TagRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.eclipse.rdf4j.query.BindingSet;
import org.eclipse.rdf4j.query.TupleQueryResult;
import org.eclipse.rdf4j.repository.sparql.SPARQLRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class WikidataService {
    private final TagRepository tagRepository;

    @PostConstruct
    public void init() {
        runProgrammingLanguagesQuery();
        runProgrammingParadigmQuery();
        runComputerScienceTermQuery();
        runSoftwareLibraryQuery();
    }
    private void runSoftwareLibraryQuery() {
        String sparqlEndpoint = EndpointConstants.SparqlEndpoints.BASE_PATH;
        SPARQLRepository repo = new SPARQLRepository(sparqlEndpoint);
        String userAgent = GeneralConstants.SparqlConstants.USER_AGENT;
        repo.setAdditionalHttpHeaders(Collections.singletonMap("User-Agent", userAgent));
        String querySelect = GeneralConstants.SparqlConstants.SOFTWARE_LIBRARY_QUERY;

        try (var connection = repo.getConnection()) {
            TupleQueryResult result = connection.prepareTupleQuery(querySelect).evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();
                SoftwareLibraryTag tag = new SoftwareLibraryTag();
                tag.setWikidataId(bindingSet.getValue("library").stringValue().replace("http://www.wikidata.org/entity/", ""));
                tag.setTagName(bindingSet.getValue("libraryLabelS").stringValue());
                tag.setTagDescription(getValueOrNull(bindingSet, "descriptionS"));
                tag.setLogoImage(getValueOrNull(bindingSet, "logoImageS"));
                tag.setOfficialWebsite(getValueOrNull(bindingSet, "officialWebSiteS"));
                tag.setStackExchangeTag(getValueOrNull(bindingSet, "stackExchangeTagS"));

                // Save the tag to the database
                tagRepository.save(tag);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        } finally {
            repo.getConnection().close();
        }
    }
    private void runComputerScienceTermQuery() {
        String sparqlEndpoint = EndpointConstants.SparqlEndpoints.BASE_PATH;
        SPARQLRepository repo = new SPARQLRepository(sparqlEndpoint);
        String userAgent = GeneralConstants.SparqlConstants.USER_AGENT;
        repo.setAdditionalHttpHeaders(Collections.singletonMap("User-Agent", userAgent));
        String querySelect = GeneralConstants.SparqlConstants.COMPUTER_SCIENCE_TERM_QUERY;
        try (var connection = repo.getConnection()) {
            TupleQueryResult result = connection.prepareTupleQuery(querySelect).evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();
                ComputerScienceTermTag tag = new ComputerScienceTermTag();
                tag.setWikidataId(bindingSet.getValue("term").stringValue().replace("http://www.wikidata.org/entity/", ""));

                tag.setTagName(bindingSet.getValue("termLabelS").stringValue());
                tag.setTagDescription(getValueOrNull(bindingSet, "descriptionS"));
                tag.setStackExchangeTag(getValueOrNull(bindingSet, "stackExchangeTagS"));

                // Save the tag to the database
                tagRepository.save(tag);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        } finally {
            repo.getConnection().close();
        }
    }

    private void runProgrammingParadigmQuery() {
        String sparqlEndpoint = EndpointConstants.SparqlEndpoints.BASE_PATH;
        SPARQLRepository repo = new SPARQLRepository(sparqlEndpoint);
        String userAgent = GeneralConstants.SparqlConstants.USER_AGENT;
        repo.setAdditionalHttpHeaders(Collections.singletonMap("User-Agent", userAgent));
        String querySelect = GeneralConstants.SparqlConstants.PROGRAMMING_PARADIGM_QUERY;
        try (var connection = repo.getConnection()) {
            TupleQueryResult result = connection.prepareTupleQuery(querySelect).evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();
                ProgrammingParadigmTag tag = new ProgrammingParadigmTag();
                tag.setWikidataId(bindingSet.getValue("paradigm").stringValue().replace("http://www.wikidata.org/entity/", ""));

                tag.setTagName(bindingSet.getValue("paradigmLabelS").stringValue());
                tag.setTagDescription(getValueOrNull(bindingSet, "descriptionS"));
                tag.setStackExchangeTag(getValueOrNull(bindingSet, "stackExchangeTagS"));

                // Save the tag to the database
                tagRepository.save(tag);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        } finally {
            repo.getConnection().close();
        }
    }

    private String getValueOrNull(BindingSet bindingSet, String variable) {
        return bindingSet.getValue(variable) != null ? bindingSet.getValue(variable).stringValue() : null;
    }

    private void runProgrammingLanguagesQuery() {
        String sparqlEndpoint = EndpointConstants.SparqlEndpoints.BASE_PATH;
        SPARQLRepository repo = new SPARQLRepository(sparqlEndpoint);
        String userAgent = GeneralConstants.SparqlConstants.USER_AGENT;
        repo.setAdditionalHttpHeaders(Collections.singletonMap("User-Agent", userAgent));
        String querySelect = GeneralConstants.SparqlConstants.PROGRAMMING_LANGUAGES_QUERY;

        try (var connection = repo.getConnection()) {
            TupleQueryResult result = connection.prepareTupleQuery(querySelect).evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();
                ProgrammingLanguagesTag tag = new ProgrammingLanguagesTag();
                tag.setWikidataId(bindingSet.getValue("language").stringValue().replace("http://www.wikidata.org/entity/", ""));
                tag.setTagName(bindingSet.getValue("languageLabelS").stringValue());
                tag.setTagDescription(bindingSet.getValue("descriptionS").stringValue());
                tag.setLogoImage(getValueOrNull(bindingSet, "logoImageS"));
                tag.setAuthor(getValueOrNull(bindingSet, "authorS"));
                tag.setInceptionYear(getValueOrNull(bindingSet, "inceptionYearS"));
                tag.setFileExtension(getValueOrNull(bindingSet, "fileExtensionS"));
                tag.setOfficialWebsite(getValueOrNull(bindingSet, "officialWebSiteS"));
                tag.setStackExchangeTag(getValueOrNull(bindingSet, "stackExchangeTagS"));

                // Save the tag to the database
                tagRepository.save(tag);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        } finally {
            repo.getConnection().close();
        }
    }


}