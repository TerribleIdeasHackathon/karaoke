import axios from 'axios';
import { JSDOM } from 'jsdom';
import { within } from '@testing-library/dom';
// @ts-ignore - There is no types for this library
import google from 'google-it';
import type { GoogleResponse } from '@/models/googleResponse';

async function render(url: string) {
  const response = await axios.get(url);
  const text = response.data;

  const dom = new JSDOM(text.replace(/<style(\s|>).*?<\/style>/gi));
  const body = dom.window.document.body;

  return {
    screen: within(body),
    document: body,
  };
}

async function getSongUrlBySearch(searchTerm: string): Promise<string> {
  const prefix = 'site:lyricsify.com';
  const result = (await google({ query: `${prefix} ${searchTerm}` })) as GoogleResponse;

  return result[0].link;
}

async function getLyrics(url: string): Promise<string | null> {
  const { screen } = await render(url);
  const lyricsSection = screen.getByText(/\[id:/i);
  const lyrics = lyricsSection.textContent;

  return lyrics;
}

export async function searchForSongLyrics(searchTerm: string): Promise<string | null> {
  const href = await getSongUrlBySearch(searchTerm);
  const lyrics = await getLyrics(href);

  return lyrics;
}
