package mx.edu.utez.server.modules.users;

import mx.edu.utez.server.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public ApiResponse findAll() {
        List<BeanUser> users = userRepository.findAll();
        return new ApiResponse("Operacion exitosa", users, false, HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ApiResponse findById(Long id) {
        try{
            BeanUser found = userRepository.findById(id).orElse(null);
            if (found == null){
                return new ApiResponse("Usuario no encontrado", true, HttpStatus.NOT_FOUND);
            }
            return new ApiResponse("Usuario encontrado", found,true, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ApiResponse("No se pudo consultar al usuario", true, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ApiResponse save(BeanUser payload){
        try{
            BeanUser saved = userRepository.save(payload);

            userRepository.save(saved);

            return new ApiResponse("Operacion exitosa", false, HttpStatus.CREATED);
        }catch(Exception e){
            e.printStackTrace();
            return new ApiResponse("No se pudo registrar la cede", true, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ApiResponse update(BeanUser payload){
        try{
            if(userRepository.findById(payload.getId()).isEmpty()){
                return new ApiResponse("Cede no encontrada", true, HttpStatus.NOT_FOUND);
            }

            userRepository.save(payload);
            return new ApiResponse("Operación exitosa", false, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ApiResponse("No se pudo actualizar la cede", true, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Transactional(rollbackFor = {SQLException.class, Exception.class})
    public ApiResponse remove(BeanUser payload){
        try{
            if(userRepository.findById(payload.getId()).isEmpty()){
                return new ApiResponse("Cede no encontrada", true, HttpStatus.NOT_FOUND);
            }

            userRepository.deleteById(payload.getId());
            return new ApiResponse("Operación exitosa", false, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ApiResponse("No se pudo eliminar la cede", true, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
