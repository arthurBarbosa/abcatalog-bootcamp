import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
  name: string;
  price: string;
  category: string;
  description: string;
}
const Form = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    price: '',
    category: '',
    description: ''
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...formData,
      imgUrl: 'https://images7.kabum.com.br/produtos/fotos/115737/console-sony-playstation-5-midia-fisica_1598984720_g.jpg',
      categories: [{ id: formData.category }]

    }
    makeRequest({ url: '/products', method: 'POST', data: payload })
  }

  return (
    <form onSubmit={handleSubmit}>
      <BaseForm title="CADASTRAR UM PRODUTO" >
        <div className="row">
          <div className="col-6">
            <input value={formData.name} name="name" type="text" className="form-control mb-5" onChange={handleOnChange} placeholder="Nome do produto" />
            <select value={formData.category} name="category" id="" className="form-control mb-5" onChange={handleOnChange}>
              <option value="1">livros</option>
              <option value="3">Computadores</option>
              <option value="2">Eletronicos</option>
            </select>
            <input value={formData.price} name="price" type="text" className="form-control " onChange={handleOnChange} placeholder="Preço" />
          </div>
          <div className="col-6">
            <textarea value={formData.description} name="description" id="" cols={30} rows={10} onChange={handleOnChange} className="form-control"></textarea>
          </div>
        </div>
      </BaseForm>
    </form>
  )
}
export default Form;