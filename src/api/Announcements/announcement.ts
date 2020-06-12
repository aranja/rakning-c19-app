import config from '../../config';

export const getAnnouncements = async language => {
  const url =
    language === 'is'
      ? config.announcementsIcelandic
      : config.announcementsEnglish;

  const res = await fetch(url, {
    headers: {
      'accept-version': '1.0.0',
    },
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    return [];
  }

  return data?.items.slice(0, 5) ?? [];
};
