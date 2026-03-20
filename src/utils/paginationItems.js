/** Маркер многоточия в списке элементов пагинации (не номер страницы). */
export const PAGINATION_ELLIPSIS = 'ellipsis';

/**
 * Номера страниц и многоточия для компактной пагинации.
 * При totalPages ≤ 5 — все страницы подряд.
 * При totalPages > 5 — перед последней страницей показывается «…» (и при необходимости слева).
 *
 * @param {number} currentPage — текущая страница (1-based)
 * @param {number} totalPages
 * @returns {(number | typeof PAGINATION_ELLIPSIS)[]}
 */
export function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const last = totalPages;

  if (currentPage <= 3) {
    return [1, 2, 3, PAGINATION_ELLIPSIS, last];
  }

  if (currentPage >= last - 2) {
    return [1, PAGINATION_ELLIPSIS, last - 2, last - 1, last];
  }

  return [
    1,
    PAGINATION_ELLIPSIS,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    PAGINATION_ELLIPSIS,
    last,
  ];
}
