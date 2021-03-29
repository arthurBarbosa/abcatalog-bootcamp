import React, { useEffect, useState } from 'react';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import BaseForm from '../../BaseForm';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Select from 'react-select'
import './styles.scss';
import { useHistory, useParams } from 'react-router';
import { Category } from 'core/types/Product';
import PriceField from './PriceField';
import ImageUpload from '../ImageUpload';

export type FormState = {
  name: string;
  price: string;
  description: string;
  imgUrl: string;
  categories: Category[];
}

type ParamsType = {
  productId: string;
}


const Form = () => {
  const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
  const history = useHistory();
  const { productId } = useParams<ParamsType>();
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const isEditing = productId !== 'create';
  const formTitle = isEditing ? 'Editar Produto' : 'Cadastrar Produto'

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/products/${productId}` })
        .then(response => {
          setValue('name', response.data.name)
          setValue('price', response.data.price)
          setValue('description', response.data.description)
          setValue('imgUrl', response.data.imgUrl)
          setValue('categories', response.data.categories)
        })
    }
  }, [productId, isEditing, setValue]);

  useEffect(() => {
    setIsLoadingCategories(true)
    makeRequest({ url: '/categories' })
      .then(response => setCategories(response.data.content))
      .finally(() => setIsLoadingCategories(false));
  }, []);

  const onSubmit = (data: FormState) => {
    makePrivateRequest({
      url: isEditing ? `/products/${productId}` : '/products',
      method: isEditing ? 'PUT' : 'POST',
      data
    })
      .then(() => {
        toast.info('Produto cadastrado com sucesso!');
        history.push('/admin/products')
      })
      .catch(() => {
        toast.error('Erro ao salvar produto!')
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title={formTitle} >
        <div className="row">
          <div className="col-6">
            <div className="margin-bottom-30">
              <input ref={register({
                required: "Campo obrigatório",
                minLength: { value: 5, message: 'Campo deve ter no mínimo 5 caracteres' },
                maxLength: { value: 60, message: 'Campo deve ter no máximo 60 caracteres' }
              })} name="name" type="text" className="form-control input-base" placeholder="Nome do produto" />

              {errors.name && (
                <div className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="margin-bottom-30">
              <Controller
                as={Select}
                name="categories"
                defaultValue=""
                rules={{ required: true }}
                control={control}
                isLoading={isLoadingCategories}
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                classNamePrefix="categories-select"
                isMulti
                placeholder="Categorias"
              />
              {errors.categories && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório
                </div>
              )}
            </div>

            <div className="margin-bottom-30">
              <PriceField control={control} />

              {errors.price && (
                <div className="invalid-feedback d-block">
                  {errors.price.message}
                </div>
              )}
            </div>

            <div className="margin-bottom-30">
              <ImageUpload />
            </div>


          </div>

          <div className="col-6">
            <textarea ref={register({ required: "Campo obrigatório" })} name="description" id="" cols={30} rows={10}
              placeholder="Descrição"
              className="form-control input-base"></textarea>

            {errors.description && (
              <div className="invalid-feedback d-block">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>
      </BaseForm>
    </form>
  )
}

export default Form;