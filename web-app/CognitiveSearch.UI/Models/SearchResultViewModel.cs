namespace CognitiveSearch.UI.Models
{
    public class SearchResultViewModel
    {
        public DocumentResult documentResult { get; set; }

        public string query { get; set; }

        public SearchFacet[] selectedFacets { get; set; }

        public int currentPage { get; set; }

        public string searchId { get; set; }
        public bool showPII { get; set; }
        public bool simpleText { get; set; }

        public string applicationInstrumentationKey { get; set; }
        public string searchServiceName { get; set; }
        public string indexName { get; set; }

        public string[] facetableFields { get; set; }
        public string textAnalyticContentAzureFunction { get; set; }
    }
}