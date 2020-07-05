package in.luv4boot.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.luv4boot.onlinebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
