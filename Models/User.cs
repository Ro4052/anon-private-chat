﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnonPrivateChat.Models
{
    public class User
    {
        public readonly Guid Id;

        public User(Guid id)
        {
            Id = id;
        }
    }
}
