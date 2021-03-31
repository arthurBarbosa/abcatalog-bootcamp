import { Category } from 'core/types/Category';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
  category: Category;
  onRemove: (categoryId: number) => void;
}

const Card = ({ category, onRemove }: Props) => {
  return (
    <div className="card-base category-card-admin ">
      <div className="row">
        <div className="col-3 text-center py-5">
          <h3>{category.name}</h3>
        </div>

        <div className="col-3 pt-3 pr-5 category-action ">
          <Link to={`/admin/categories/${category.id}`}
            className="btn btn-outline-secondary btn-block border-radius-10 mb-3 button"
          >
            EDITAR
            </Link>
          <button
            type="button"
            className="btn btn-outline-danger btn-block border-radius-10 button button-trash"
            onClick={() => onRemove(category.id)}
          >
            EXCLUIR
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card;