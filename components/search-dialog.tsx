'use client';

import { useMemo } from 'react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { create } from '@orama/orama';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
} from 'fumadocs-ui/components/dialog/search';
import type { SharedProps } from 'fumadocs-ui/contexts/search';

type SearchLink = [name: string, href: string];

/**
 * Orama 静态搜索初始化 — 客户端使用中文分词器
 * 必须和服务端 app/api/search/route.ts 的 tokenizer 保持一致
 */
async function initOrama() {
  return create({
    schema: { _: 'string' },
    components: {
      tokenizer: createTokenizer(),
    },
  });
}

export default function StaticSearchDialog({
  open,
  onOpenChange,
  api = '/api/search',
  links = [],
}: SharedProps & { api?: string; links?: SearchLink[] }) {
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    from: api,
    initOrama,
  });

  const defaultItems = useMemo(() => {
    if (links.length === 0) return null;
    return links.map(([name, link]) => ({
      type: 'page' as const,
      id: name,
      content: name,
      url: link,
    }));
  }, [links]);

  return (
    <SearchDialog
      open={open}
      onOpenChange={onOpenChange}
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList
          items={query.data !== 'empty' ? query.data : defaultItems}
        />
      </SearchDialogContent>
    </SearchDialog>
  );
}
