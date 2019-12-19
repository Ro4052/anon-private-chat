using System;
using System.Collections.Generic;

namespace AnonPrivateChat.Repositories
{
    public interface IRepository<T>
    {
        public T GetOne(Guid id);

        public List<T> GetAll();

        public void AddOne(T item);

        public void RemoveOne(Guid id);
    }
}
