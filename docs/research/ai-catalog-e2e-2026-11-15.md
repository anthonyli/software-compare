# AI catalog E2E maintenance
Current main c338478: fixed counts15/11/7 are accurate. This is future maintenance reduction, NOT a current production regression.
Expectations now read source category files independently of rendered DOM. Validate nonempty unique catalog IDs, exact number AND identity multiset for desktop rows/mobile cards at1280/390, plus visible first/last.
Preserve explicit DeepSeek/Cursor/CraftAnything/Recraft/ArtCraft checks, Kimi details toggle and note visibility, scenario guide, overflow and legacy redirects. Catalog removal is not silently justified by this test alone: explicit fixtures and other catalog tests remain. No production code/config changes.
