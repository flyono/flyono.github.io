import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

// 静态导出模式下使用 staticGET，构建时生成 Orama 索引为静态 JSON
// 客户端加载后本地搜索，无需服务端
export const dynamic = 'force-static';
export const { staticGET: GET } = createFromSource(source, {
  // 使用 mandarin tokenizer 时不能同时传 language 选项
  tokenizer: createTokenizer(),
});
