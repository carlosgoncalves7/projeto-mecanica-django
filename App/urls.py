from django.urls import path
from .views import ExcluirRegistro,Erro, index,Dash, Clientes, cadClientes, altCliente,exCliente,exMecanico, altVeiculo,cadVeiculo,Pecas, Orcamentos,exOrcamento, cadPeca, altPeca, exPeca
from . import views


urlpatterns = [
    path('', index, name="index"),
    # URL para APIs
    path("api/buscar/veiculo/", views.filtros_veiculo, name="buscar_veiculo"),
    path('dashboard',Dash,name="dashboard"),
    path('excluir-registro/<str:tabela>/<int:pk>',ExcluirRegistro,name="excluir-registro"),
    path('error', Erro, name="error"),
    #  URL de clientes
    path('clientes',Clientes,name="clientes"),
    path('cadClientes', cadClientes, name="cadClientes"),
    path('altCliente/<int:pk>', altCliente, name="altCliente"),
    path('excluir-cliente/<int:pk>', exCliente, name="excluir-cliente"),
    # URL de mecanicos
    path('mecanicos/',views.MecanicosView.as_view(),name="mecanicos"),
    path('cadMecanico', cadClientes, name="cadMecanico"),
    path('excluir-mecanico/<int:pk>', exMecanico, name='excluir-mecanico'),
    # URL de veiculos
    # path('veiculos',Veiculos,name="veiculos"),
    # as_view() : consegue saber que tipo de método chamar da classe com base no tipo da requisição vindo do front-end
    path('veiculos/', views.VeiculosView.as_view(), name='veiculos'),
    path('cadastrar/veiculo', cadVeiculo, name="cadastrar-veiculo"),
    path('altVeiculo/<int:pk>', altVeiculo, name="altVeiculo"),
    path('excluir/<str:tabela>/<int:pk>', ExcluirRegistro, name="excluir-registro"),
    # URL de peças
    path('pecas',Pecas,name="pecas"),
    path('cadPeca', cadPeca, name="cadPeca"),
    path('altPeca/<int:pk>', altPeca, name="altPeca"),
    path('excluir-peca/<int:pk>', exPeca, name="excluir-peca"),
    # URL de orçamentos
    path('orcamentos',Orcamentos,name="orcamentos"),
    path('excluir-orcamento/<int:pk>', exOrcamento, name="excluir-orcamento"),
]
