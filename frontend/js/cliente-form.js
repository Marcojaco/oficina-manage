const form = document.querySelector("#form-cliente");
const params = new URLSearchParams(location.search);
const clienteId = params.get("id");

const $ = id => document.querySelector(id);
const cep = $("#cep-cliente"), rua = $("#rua-cliente"), numero = $("#numero-cliente");
const bairro = $("#bairro-cliente"), cidade = $("#cidade-cliente"), estado = $("#estado-cliente");
const telefone = $("#telefone-cliente"), mensagem = $("#mensagem"), btn = $("#btn-cadastrar");

function msg(text, type) { mensagem.textContent=text; mensagem.className=`mensagem ${type}`; }
function clearAddress() { rua.value=""; bairro.value=""; cidade.value=""; estado.value=""; }

cep.addEventListener("input", () => {
  let v=cep.value.replace(/\D/g,"").slice(0,8);
  if(v.length>5) v=v.replace(/^(\d{5})(\d)/,"$1-$2");
  cep.value=v;
});
telefone.addEventListener("input", () => {
  let v=telefone.value.replace(/\D/g,"").slice(0,11);
  if(v.length>10) v=v.replace(/^(\d{2})(\d{5})(\d{4})/,"($1) $2-$3");
  else if(v.length>6) v=v.replace(/^(\d{2})(\d{4})(\d{0,4})/,"($1) $2-$3");
  else if(v.length>2) v=v.replace(/^(\d{2})(\d+)/,"($1) $2");
  telefone.value=v;
});
cep.addEventListener("blur", async () => {
  const value=cep.value.replace(/\D/g,""); clearAddress();
  if(!value) return;
  if(value.length!==8){ $("#cep-status").textContent="CEP inválido"; msg("Digite um CEP válido com 8 números.","erro"); return; }
  $("#cep-status").textContent="Consultando...";
  try {
    const r=await fetch(`https://viacep.com.br/ws/${value}/json/`);
    if(!r.ok) throw new Error();
    const data=await r.json();
    if(data.erro) throw new Error("CEP não encontrado.");
    rua.value=data.logradouro||""; bairro.value=data.bairro||""; cidade.value=data.localidade||""; estado.value=data.uf||"";
    $("#cep-status").textContent="CEP encontrado"; mensagem.className="mensagem"; mensagem.textContent="";
  } catch(e) {
    $("#cep-status").textContent="Erro"; clearAddress(); msg(e.message||"Não foi possível consultar o CEP.","erro");
  }
});

async function carregarCliente() {
  if(!clienteId) return;
  $("#titulo-form").textContent="Editar cliente"; btn.textContent="SALVAR ALTERAÇÕES";
  try {
    const data=await apiRequest(`/clientes/${encodeURIComponent(clienteId)}`);
    const c=data?.dados || data?.cliente || data;
    $("#nome-cliente").value=c.nome||""; telefone.value=c.telefone||""; cep.value=c.cep||"";
    cidade.value=c.cidade||""; estado.value=c.estado||"";
    // O backend atual guarda endereço como string; não há como separar rua/número/bairro com segurança.
    rua.value=c.endereco||"";
    numero.value="";
  } catch(e) { msg(e.message,"erro"); }
}
form.addEventListener("submit", async e => {
  e.preventDefault(); mensagem.className="mensagem"; 
  const cepValue=cep.value.replace(/\D/g,""), tel=telefone.value.replace(/\D/g,"");
  if(tel.length<10 || tel.length>11) return msg("Digite um telefone válido.","erro");
  if(cepValue.length!==8) return msg("Digite um CEP válido.","erro");
  if(!rua.value.trim()) return msg("Consulte um CEP válido antes de cadastrar.","erro");
  if(!numero.value.trim() && !clienteId) return msg("Informe o número do endereço.","erro");
  const endereco=clienteId && !numero.value.trim() ? rua.value.trim() : [rua.value.trim(),numero.value.trim(),bairro.value.trim()].join(", ");
  const payload={nome:$("#nome-cliente").value.trim(),telefone:tel,endereco,cidade:cidade.value.trim(),estado:estado.value.trim(),cep:cepValue};
  btn.disabled=true; btn.textContent=clienteId?"SALVANDO...":"CADASTRANDO...";
  try {
    await apiRequest(clienteId?`/clientes/${encodeURIComponent(clienteId)}`:"/clientes",{method:clienteId?"PUT":"POST",body:JSON.stringify(payload)});
    msg(clienteId?"Cliente atualizado com sucesso!":"Cliente cadastrado com sucesso!","sucesso");
    if(!clienteId){form.reset();clearAddress();$("#cep-status").textContent="";}
  } catch(e) { msg(e.message,"erro"); }
  finally { btn.disabled=false; btn.textContent=clienteId?"SALVAR ALTERAÇÕES":"CADASTRAR"; }
});
carregarCliente();