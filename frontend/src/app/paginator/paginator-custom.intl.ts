import { MatPaginatorIntl } from '@angular/material/paginator';

//Pas d'i18n pour l'instant donc je fais ce petit custom francais

export function getFrenchPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Éléments par page';
    paginatorIntl.nextPageLabel = 'Page suivante';
    paginatorIntl.previousPageLabel = 'Page précédente';
    paginatorIntl.firstPageLabel = 'Première page';
    paginatorIntl.lastPageLabel = 'Dernière page';

    paginatorIntl.getRangeLabel = (
        page: number,
        pageSize: number,
        length: number
    ) => {
        if (length === 0 || pageSize === 0) {
            return `0 de ${length}`;
        }
        const startIndex = page * pageSize;
        const endIndex =
            startIndex < length
                ? Math.min(startIndex + pageSize, length)
                : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
    };

    return paginatorIntl;
}
