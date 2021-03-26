import Pagination from 'core/components/Pagination';
import { ProductResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';

const List = () => {
  const [productResponse, setProductResponse] = useState<ProductResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();

  const getProducts = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 4,
      direction: 'DESC',
      orderBy: 'id'
    };

    setIsLoading(true);
    makeRequest({ url: "/products", params })
      .then((response) => setProductResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleCreate = () => {
    history.push('/admin/products/create')
  }

  const onRemove = (productId: number) => {
    const confirm = window.confirm('Deseja realmente excluir esta produto?')
    if (confirm) {
      makePrivateRequest({
        url: `/products/${productId}`, method: 'DELETE'
      })
        .then(() => {
          toast.info('Produto removido com sucesso!');
          getProducts();
        })
        .catch(() => {
          toast.error('Erro ao remover produto.');
        })
    }
  }

  return (
    <div className="admin-products-list">
      <button className="btn btn-primary btn-lg" onClick={handleCreate}>
        ADICIONAR
      </button>
      <div className="admin-list-container">
        {productResponse?.content.map(product => (
          <Card product={product} key={product.id} onRemove={onRemove} />
        ))}
      </div>

      {productResponse && (
        <Pagination
          totalPages={productResponse.totalPages}
          activePage={activePage}
          onChange={page => setActivePage(page)} />)}
    </div>
  )
}

export default List;