export interface Comment {
  postId: string;
  _id: string;
  text: string;
  commentator_name: string;  //onoma
  _owner_comm: string;  //stelnw to id mou
  date_comm: string;
}

export interface User {
  name: string;
  surname: string;
  country: string;
  city: string;
  address: string;
  number: number;
  postcode: string;
  job_description: string;
  education: string;
  skills: string;
  age: number;
  mobile: number;
  email: string;
  github: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  friends: Array<User>;
  password: string;
  __v: number;
  _id: string;
  user_Image: string;
  is_active: boolean;
}



export interface Post {
  _id: string;
  ncomments: Array<Comment>;
  title: string;
  text: string;
  _owner: string;
  post_Image: string;
  _owner_name: User;
  date: string;
  likes: number;
  __v: number;
}

// export class PostImpl implements Post {
//   _id: string;
//   comments: Array<Comment>;
//   title: string;
//   text: string;
//   _owner: string;
//   _owner_name: User;
//   date: string;
//   likes: number;
//   __v: number;

//   "constructor"(  _id: string, comments: Array<Comment>, title: string, text: string, _owner: string, _owner_name: User, date: string, likes: number, __v: number) { 
//     this._id = _id;
//     this.comments = comments;
//     this.title = title;
//     this.text = text;
//     this._owner = _owner;
//     this._owner_name = _owner_name;
//     this.date = date;
//     this.likes = likes;
//     this.__v = __v;
//   }
// }

export interface Posts {
  posts:Array<Post>
}

// export class PostsImpl implements Posts {
//   posts:Array<Post>

//   "constructor"( posts:Array<Post>) { 
//     console.log("constructing ",posts)
//     posts.forEach( (element) => {
//       console.log("constructing ",element)
//     });
//     for (var i = 0; i < posts.length; i++) {
//       this.posts[i] = new PostImpl(posts[i]._id, posts[i].comments, posts[i].title, posts[i].text, posts[i]._owner, posts[i]._owner_name, posts[i].date, posts[i].likes,posts[i].__v);
//   }
//   }
// }
