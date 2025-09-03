export const getHrefFromDoc = (doc) =>{
  if (doc.type === "page") {
    return `/${doc.uid}`;
  }
  
  if (doc.type === "blog_post") {
    return `/blogg/${doc.uid}`;
  }
  
  if (doc?.link_type === "page") {
    return `/${doc?.uid}`;
  }

  if (doc?.link_type === "blog_post") {
    return `/blogg/${doc?.uid}`;
  }

  if (doc?.link_type === "Web") {
    return doc.url;
  }

  return `/`;
}