import { CreateCliente } from '../../src/application/use-cases/CreateCliente';
import { Cliente } from '../../src/domain/entities/Cliente';

describe('CreateCliente UseCase', () => {
  // Mocks reutilizáveis
  const mockRepo = {
    criar: jest.fn(),
  };

  const mockKafka = {
    send: jest.fn(),
  };

  // Instância do use-case
  const service = new CreateCliente(mockRepo as any, mockKafka as any);

  // DTO válido base
  const validDto = {
    nome: 'Nome Teste',
    email: 'email@teste.com',
    telefone: '123456789',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um novo cliente com sucesso', async () => {
    // Arrange
    const clienteCriado = new Cliente(
      'id123',
      validDto.nome,
      validDto.email,
      validDto.telefone
    );
    mockRepo.criar.mockResolvedValue(clienteCriado);

    // Act
    const result = await service.execute(validDto);

    // Assert - repositório
    expect(mockRepo.criar).toHaveBeenCalledTimes(1);
 expect(mockRepo.criar).toHaveBeenCalledWith(expect.objectContaining({
  nome: 'Nome Teste',
  email: 'email@teste.com',
  telefone: '123456789',
}));

    // Assert - retorno
    expect(result).toBeInstanceOf(Cliente);
    expect(result.id).toBe('id123');
    expect(result.email).toBe(validDto.email);

    // Assert - Kafka
    expect(mockKafka.send).toHaveBeenCalledTimes(1);
    expect(mockKafka.send).toHaveBeenCalledWith(
      'cliente.criado',
      expect.objectContaining({
        id: clienteCriado.id,
        nome: clienteCriado.nome,
        email: clienteCriado.email,
        telefone: clienteCriado.telefone,
      })
    );
  });

  it('deve lançar erro se o repositório falhar', async () => {
    // Arrange
    mockRepo.criar.mockRejectedValue(new Error('Falha interna'));

    // Act + Assert
    await expect(service.execute(validDto)).rejects.toThrow('Falha interna');

    // Kafka não deve ser chamado
    expect(mockKafka.send).not.toHaveBeenCalled();
  });

  it('não deve criar cliente se os dados forem inválidos (simulação)', async () => {
    // Simula dados inválidos (validação esperada no use-case ou camada anterior)
    const invalidDto = { nome: '', email: 'invalido', telefone: '' };

    await expect(service.execute(invalidDto as any)).rejects.toThrow();

    // Não deve chamar persistência nem Kafka
    expect(mockRepo.criar).not.toHaveBeenCalled();
    expect(mockKafka.send).not.toHaveBeenCalled();
  });
});