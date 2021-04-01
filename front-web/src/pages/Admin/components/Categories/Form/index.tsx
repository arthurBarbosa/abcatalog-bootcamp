import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';

export type FormState = {
  name: string;
}

type ParamsType = {
  categoryId: string;
}

const Form = () => {
  const { register, handleSubmit, errors, setValue } = useForm<FormState>();
  const history = useHistory();
  const { categoryId } = useParams<ParamsType>();
  const isEditing = categoryId !== 'create';
  const formTitle = isEditing ? 'Editar Categoria' : 'Cadastrar Categoria'

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/categories/${categoryId}` })
        .then(response => {
          setValue('name', response.data.name)
        });
    }
  }, [categoryId, isEditing, setValue]);

  const onSubmit = (data: FormState) => {
    makePrivateRequest({
      url: isEditing ? `/categories/${categoryId}` : '/categories',
      method: isEditing ? 'PUT' : 'POST',
      data
    })
      .then(() => {
        toast.info('Categoria cadastrada com sucesso.');
        history.push('/admin/categories')
      })
      .catch(() => {
        toast.error('Erro ao salvar categoria.');
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle}>
        <div className="row">
          <div className="col-12">
            <div className="margin-bottom-30">
              <input
                ref={register({
                  required: 'Campo obrigatório',
                  minLength: { value: 3, message: 'Campo deve ter no mínimo 3 caracteres' },
                  maxLength: { value: 60, message: 'Campo deve ter no máximo 60 caracteres' }
                })

                }
                type="text" name="name" className="form-control" placeholder="Nome da categoria" />

              {errors.name && (
                <div className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </BaseForm>
    </form>
  )
}

export default Form;