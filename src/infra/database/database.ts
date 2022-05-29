/**
 * Acessando e retornando as informações que estão dentro dos JSONs
 *
 * O ideal seria se conectar com um banco de dados real e devolver essa conexão
 * com acesso a GETS, POSTS, PUTS e DELETES
 */

import purchase from '../../../assets/data/compras.json';

export function getPurchaseInfo(): any {
  return purchase;
}

export function getSaleInfo(): void {

}
