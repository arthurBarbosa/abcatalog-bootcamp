import React, { useCallback, useEffect, useState } from 'react';
import { CategoryResponse } from 'core/types/Category';
import Card from '../Card'
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import CardLoader from '../../Products/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

const List = () => {
  const [categoryResponse, setCategoryResponse] = useState<CategoryResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();

  const getCategories = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 4,
      direction: 'DESC',
      orderBy: 'id'
    };
    setIsLoading(true);
    makeRequest({ url: '/categories', params })
      .then((response) => setCategoryResponse(response.data))
      .finally(() => setIsLoading(false))
  }, [activePage])


  useEffect(() => {
    getCategories();
  }, [getCategories])

  const onRemove = (categoryId: number) => {
    const confirm = window.confirm('Deseja realmente excluir esta categoria?')
    if (confirm) {
      makePrivateRequest({
        url: `/categories/${categoryId}`, method: 'DELETE'
      })
        .then(() => {
          toast.info('Categoria removido com sucesso!');
          getCategories();
        })
        .catch(() => {
          toast.error('Erro ao remover esta categoria.');
        })
    }
  }

  const handleCreate = () => {
    history.push('/admin/categories/create')
  }
  return (
    <div>
      <button className="btn btn-primary btn-lg" onClick={handleCreate}>
        ADICIONAR
      </button>
      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : (
          categoryResponse?.content.map(category => (
            <Card category={category} key={category.id}
              onRemove={onRemove} />
          ))
        )}

        {categoryResponse && (
          <Pagination
            totalPages={categoryResponse.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)} />)}

      </div>
    </div>
  )
}

export default List;