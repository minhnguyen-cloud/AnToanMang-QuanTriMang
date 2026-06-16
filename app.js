/* ATMMT local exam generator - no dependencies */
(function(){
  const $ = (id) => document.getElementById(id);
  const letters = ['A','B','C','D','E','F'];
  let currentExam = [];
  let currentExamSets = [];
  let userAnswers = {};
  let answersVisible = false;
  let lastExamIds = [];
  let examSubmitted = false;
  let timerId = null;
  let timerEndsAt = 0;
  let activeQuestionUid = null;
  const EXAM_CATALOG_SIZE = 50;
  const DYNAMIC_BANK_SIZE = 2000;
  const COMPLETED_EXAMS_KEY = 'atmmt-qtm-completed-exams-v1';

  const subjectConfig = {
    atmm: {
      label: 'ATMMT',
      fullName: 'An toàn mạng máy tính',
      examTitle: 'BỘ ĐỀ ÔN TẬP TẠO TỰ ĐỘNG'
    },
    qtm: {
      label: 'QTM',
      fullName: 'Quản trị mạng',
      examTitle: 'ĐỀ QUẢN TRỊ MẠNG - ÔN THI TỔNG HỢP'
    }
  };

  const typeLabel = {
    mcq:'Trắc nghiệm', tf:'Đúng/Sai', fill:'Điền khuyết', short:'Tự luận ngắn', match:'Ghép cặp', calc:'Bài tính'
  };
  const diffLabel = {1:'Cơ bản', 2:'Bằng đề ôn', 3:'Khó/gài bẫy'};
  const SUPPLEMENTAL_QUESTIONS = [
    {
      id:'SUP-MITM-DH-01', type:'mcq', lesson:'Bài 4', topic:'DH và MITM', difficulty:3,
      question:'Hai máy dùng Diffie-Hellman thuần túy qua kênh công khai. Attacker có thể thay giá trị công khai A và B trên đường truyền. Nhận định nào đúng nhất?',
      options:['DH vẫn an toàn vì shared secret không được gửi trực tiếp','Cần xác thực giá trị DH bằng chữ ký số/certificate để chống MITM','Chỉ cần tăng p lên số nguyên tố lớn hơn là đủ chống MITM','Đổi sang Caesar sẽ tránh bị thay khóa','Bỏ bước sinh khóa phiên là an toàn hơn'],
      answer:1,
      explanation:'DH giải quyết trao đổi khóa nhưng không tự xác thực danh tính. Nếu không ký hoặc xác thực endpoint, attacker có thể lập hai khóa riêng với hai phía rồi đứng giữa.'
    },
    {
      id:'SUP-RSA-PHI-01', type:'mcq', lesson:'Bài 4', topic:'RSA vận dụng', difficulty:3,
      question:'Trong RSA, chọn p và q quá gần nhau làm tăng rủi ro nào?',
      options:['Dễ dò p, q hơn bằng phân tích thừa số','Không tính được n','Public key biến thành private key','Không thể mã hóa thông điệp ngắn','Ciphertext luôn bằng plaintext'],
      answer:0,
      explanation:'An toàn RSA dựa vào độ khó phân tích n=pq. Nếu p và q có cấu trúc yếu hoặc quá gần nhau, một số phương pháp phân tích thừa số hiệu quả hơn.'
    },
    {
      id:'SUP-HASH-MAC-01', type:'mcq', lesson:'Bài 5', topic:'Hash/MAC', difficulty:3,
      question:'Một hệ thống chỉ gửi kèm SHA-256(message), không dùng khóa bí mật. Điều nào là điểm yếu chính?',
      options:['Không chứng minh được người gửi biết khóa bí mật','SHA-256 luôn giải mã ngược được','Digest luôn dài hơn message','Không kiểm tra được toàn vẹn','Không dùng được cho file lớn'],
      answer:0,
      explanation:'Hash không khóa kiểm tra thay đổi vô tình nếu digest được bảo vệ riêng, nhưng không xác thực nguồn gửi. MAC/HMAC cần khóa bí mật nên chống giả mạo tốt hơn.'
    },
    {
      id:'SUP-SIGN-MAC-01', type:'mcq', lesson:'Bài 5', topic:'Chữ ký số', difficulty:3,
      question:'Trong tranh chấp, vì sao chữ ký số phù hợp hơn MAC để chứng minh A đã gửi thông điệp?',
      options:['Chữ ký số dùng khóa riêng chỉ A giữ','MAC không cần khóa','MAC luôn dài hơn chữ ký','Chữ ký số không cần hash','MAC không kiểm tra toàn vẹn'],
      answer:0,
      explanation:'MAC dùng khóa chung nên cả hai bên đều tạo được MAC, khó quy trách nhiệm một phía. Chữ ký số dùng private key của người ký và public key để xác minh.'
    },
    {
      id:'SUP-TLS-01', type:'mcq', lesson:'Bài 6', topic:'TLS', difficulty:3,
      question:'Người dùng truy cập HTTPS nhưng bỏ qua cảnh báo certificate không hợp lệ. Rủi ro sát nhất là gì?',
      options:['Tăng tốc bắt tay TLS','Server có thể bị mạo danh trong MITM','Mã hóa AES tự tắt hoàn toàn','Trình duyệt không gửi HTTP request','DNS không phân giải được'],
      answer:1,
      explanation:'TLS cần xác thực certificate để biết public key thuộc đúng server. Bỏ qua cảnh báo làm attacker có thể đưa certificate giả và giải mã/đọc sửa lưu lượng.'
    },
    {
      id:'SUP-IPSEC-01', type:'mcq', lesson:'Bài 6', topic:'IPsec', difficulty:3,
      question:'Công ty muốn nối bảo mật hai chi nhánh qua Internet sao cho toàn bộ gói IP nội bộ được bọc trong gói IP mới. Chế độ IPsec phù hợp là:',
      options:['Tunnel mode','Transport mode','Open authentication','WEP shared key','Stateless filtering'],
      answer:0,
      explanation:'Tunnel mode bọc cả gói IP gốc trong gói mới, thường dùng gateway-to-gateway/VPN site-to-site. Transport mode chủ yếu bảo vệ payload giữa hai host.'
    },
    {
      id:'SUP-WIFI-01', type:'mcq', lesson:'Bài 7', topic:'Wi-Fi', difficulty:3,
      question:'Attacker dựng AP cùng tên mạng công ty và phát sóng mạnh hơn để người dùng kết nối nhầm. Đây là tình huống nào?',
      options:['Evil Twin','Smurf attack','Buffer overflow','RSA factoring','Screened subnet'],
      answer:0,
      explanation:'Evil Twin là điểm truy cập giả mạo SSID/hình ảnh mạng hợp pháp để lừa client kết nối, từ đó đánh cắp thông tin hoặc thực hiện MITM.'
    },
    {
      id:'SUP-WIFI-02', type:'mcq', lesson:'Bài 7', topic:'WPA handshake', difficulty:3,
      question:'Vì sao attacker hay gửi deauthentication frame trong tấn công Wi-Fi?',
      options:['Ép client kết nối lại để bắt handshake','Tăng độ dài khóa AES','Xóa certificate của CA','Tạo private key RSA mới','Bật DMZ trên router'],
      answer:0,
      explanation:'Deauth làm client rớt và bắt tay lại. Attacker thu handshake rồi thử đoán passphrase offline; bản thân deauth không trực tiếp giải mã được khóa.'
    },
    {
      id:'SUP-FW-ACL-01', type:'mcq', lesson:'Bài 8', topic:'ACL', difficulty:3,
      question:'Một rule firewall cho phép Internet truy cập thẳng database nhân sự ở internal network. Vấn đề chính là gì?',
      options:['Vi phạm least privilege và làm lộ tài nguyên nội bộ','Làm DNS chạy nhanh hơn','Chỉ ảnh hưởng giao thức UDP','Tự động bật chữ ký số','Biến firewall thành proxy hợp lệ'],
      answer:0,
      explanation:'Dịch vụ nội bộ nhạy cảm không nên public trực tiếp. Nên đặt dịch vụ cần public ở DMZ và chỉ mở đúng luồng cần thiết theo default deny.'
    },
    {
      id:'SUP-FW-STATE-01', type:'mcq', lesson:'Bài 8', topic:'Stateful firewall', difficulty:3,
      question:'Stateful firewall khác packet filter stateless ở điểm thực dụng nào?',
      options:['Theo dõi trạng thái phiên để quyết định gói phản hồi hợp lệ','Không cần rule','Luôn đọc được nội dung HTTPS','Thay thế hoàn toàn antivirus','Chỉ lọc theo địa chỉ MAC'],
      answer:0,
      explanation:'Stateful firewall nhớ connection state nên phân biệt gói phản hồi thuộc phiên hợp lệ với gói lạ. Stateless chủ yếu xét từng gói theo header/rule riêng lẻ.'
    },
    {
      id:'SUP-REPLAY-01', type:'mcq', lesson:'Bài 1', topic:'Replay attack', difficulty:3,
      question:'Một hệ thống chấp nhận lại mã OTP đã dùng cách đây 2 phút. Biện pháp đúng trọng tâm nhất là gì?',
      options:['Nonce/timestamp và đánh dấu token đã dùng','Tăng kích thước font form đăng nhập','Đổi HTTP sang FTP','Tắt log đăng nhập','Dùng cùng OTP cho nhiều phiên'],
      answer:0,
      explanation:'Replay khai thác thông điệp hợp lệ cũ. Nonce, timestamp, cửa sổ thời gian ngắn và danh sách token đã dùng giúp hệ thống từ chối bản phát lại.'
    },
    {
      id:'SUP-MALWARE-01', type:'mcq', lesson:'Bài 2a', topic:'Malware', difficulty:3,
      question:'Mã độc tự thay đổi cấu trúc chương trình qua mỗi lần lây, không chỉ đổi lớp mã hóa bên ngoài. Thuật ngữ sát nhất là:',
      options:['Metamorphic','Polymorphic đơn giản','Worm thuần túy','Port scanner','DMZ'],
      answer:0,
      explanation:'Polymorphic thường đổi hình thức/lớp mã hóa để né signature; metamorphic tái cấu trúc mã sâu hơn nên khó nhận diện bằng mẫu tĩnh.'
    },
    {
      id:'SUP-AES-01', type:'mcq', lesson:'Bài 3', topic:'Block cipher mode', difficulty:3,
      question:'Cùng plaintext block xuất hiện nhiều lần và ciphertext cũng lặp mẫu rõ ràng. Mode mã khối nào thường gây hiện tượng này?',
      options:['ECB','CBC với IV ngẫu nhiên','CTR với nonce duy nhất','GCM với nonce đúng','Không mode nào'],
      answer:0,
      explanation:'ECB mã hóa mỗi block độc lập, cùng plaintext block cho cùng ciphertext block. CBC/CTR/GCM cần IV/nonce đúng để tránh lộ mẫu lặp.'
    },
    {
      id:'SUP-OTP-01', type:'mcq', lesson:'Bài 3', topic:'One-time pad', difficulty:3,
      question:'One-time pad mất tính an toàn hoàn hảo khi lỗi nào xảy ra?',
      options:['Dùng lại khóa cho hai thông điệp','Khóa dài bằng thông điệp','Khóa sinh thật ngẫu nhiên','XOR từng bit','Người nhận biết khóa'],
      answer:0,
      explanation:'OTP chỉ an toàn khi khóa ngẫu nhiên, dài bằng thông điệp và dùng đúng một lần. Dùng lại khóa làm lộ quan hệ giữa các plaintext.'
    },
    {
      id:'SUP-PGP-01', type:'mcq', lesson:'Bài 6', topic:'PGP hybrid', difficulty:3,
      question:'Trong PGP kiểu hybrid, vì sao không mã hóa toàn bộ email bằng RSA trực tiếp?',
      options:['RSA chậm và không phù hợp dữ liệu lớn, nên dùng khóa phiên đối xứng cho nội dung','RSA không có public key','AES không giải mã được','Email không thể băm','Certificate chỉ dùng cho firewall'],
      answer:0,
      explanation:'Mô hình hybrid dùng AES/khóa phiên để mã hóa dữ liệu nhanh, rồi dùng public key RSA của người nhận để mã hóa khóa phiên.'
    },
    {
      id:'SUP-KERB-01', type:'mcq', lesson:'Bài 6', topic:'Kerberos', difficulty:3,
      question:'Trong Kerberos, client không gửi mật khẩu trực tiếp cho từng service chủ yếu để đạt mục tiêu nào?',
      options:['Giảm lộ mật khẩu và dùng ticket/khóa phiên để xác thực','Bỏ hoàn toàn KDC','Mã hóa ổ cứng','Tạo địa chỉ MAC mới','Thay thế DNS'],
      answer:0,
      explanation:'Kerberos dựa trên KDC, ticket và khóa phiên. Mật khẩu chỉ dùng trong quá trình lấy thông tin ban đầu, không phải gửi lại cho từng server dịch vụ.'
    }
  ];

  function xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function() {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }
  function mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function rngFromSeed(seed){ return mulberry32(xmur3(seed)()); }
  function shuffle(arr, rng){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(rng()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }
  function choice(arr,rng){ return arr[Math.floor(rng()*arr.length)]; }
  function isGradable(q){ return q.type==='mcq' || (q.type==='calc' && q.options && q.options.length) || q.type==='tf'; }

  function stableScore(value, salt=''){
    return xmur3(`${salt}|${value}`)() / 4294967296;
  }

  function modPow(base, exp, mod){
    let b = BigInt(base), e = BigInt(exp), m = BigInt(mod), r = 1n;
    while(e>0n){ if(e&1n) r=(r*b)%m; b=(b*b)%m; e >>= 1n; }
    return Number(r);
  }
  function egcd(a,b){
    if(b===0) return [a,1,0];
    const [g,x1,y1] = egcd(b, a % b);
    return [g, y1, x1 - Math.floor(a/b)*y1];
  }
  function modInv(a,m){
    const [g,x] = egcd(a,m);
    if(g!==1) return null;
    return ((x % m)+m)%m;
  }
  function gcd(a,b){ while(b){ [a,b]=[b,a%b]; } return Math.abs(a); }

  function caesar(text, k, decrypt=false){
    const shift = decrypt ? (26-k) : k;
    return text.toUpperCase().replace(/[A-Z]/g, ch => String.fromCharCode((ch.charCodeAt(0)-65+shift)%26+65));
  }

  function dynamicQuestions(seed, count=80){
    if(getSubject() === 'qtm') return networkDynamicQuestions(seed, count);
    const rng = rngFromSeed('dynamic-'+seed);
    const qs = [];
    const words = ['UIT','NETWORK','SECURITY','CLOUD','FIREWALL','PACKET','CRYPTO','MALWARE'];
    for(let i=0;i<6;i++){
      const p = choice(words,rng), k = 1 + Math.floor(rng()*24), c = caesar(p,k);
      qs.push({id:`DYN-C-${i}`, type:'calc', lesson:'Bài 3', topic:'Caesar', difficulty:2,
        question:`Mã hóa Caesar plaintext "${p}" với khóa k=${k}. Ciphertext là gì?`,
        options: shuffle([c, caesar(p,(k+1)%26), caesar(p,(k+2)%26), p, caesar(p,(26-k)%26)],rng),
        answer:null, explanation:`Áp dụng C=(p+k) mod 26 với k=${k}. Kết quả đúng: ${c}.`, computedAnswer:c});
    }
    const rsaSets = [
      {p:11,q:17,e:7,M:5}, {p:7,q:11,e:7,M:9}, {p:13,q:17,e:5,M:10}, {p:5,q:11,e:3,M:7}, {p:17,q:19,e:5,M:12}
    ];
    for(let i=0;i<5;i++){
      const s = choice(rsaSets,rng), n=s.p*s.q, phi=(s.p-1)*(s.q-1), d=modInv(s.e,phi), C=modPow(s.M,s.e,n);
      qs.push({id:`DYN-RSA-${i}`, type:'calc', lesson:'Bài 4', topic:'RSA', difficulty:3,
        question:`RSA nhỏ: p=${s.p}, q=${s.q}, e=${s.e}, M=${s.M}. Giá trị n, φ(n), d và ciphertext C là gì?`,
        options: [], answer:`n=${n}, φ(n)=${phi}, d=${d}, C=${C}`,
        explanation:`n=pq=${n}; φ(n)=(p-1)(q-1)=${phi}; d=e^-1 mod φ(n)=${d}; C=M^e mod n=${C}.`});
    }
    const dhSets = [
      {p:23,g:5,a:6,b:15},{p:29,g:2,a:5,b:12},{p:31,g:3,a:7,b:11},{p:353,g:3,a:97,b:233}
    ];
    for(let i=0;i<5;i++){
      const s = choice(dhSets,rng), A=modPow(s.g,s.a,s.p), B=modPow(s.g,s.b,s.p), K1=modPow(B,s.a,s.p), K2=modPow(A,s.b,s.p);
      qs.push({id:`DYN-DH-${i}`, type:'calc', lesson:'Bài 4', topic:'Diffie-Hellman', difficulty:3,
        question:`Diffie-Hellman: p=${s.p}, g=${s.g}, private a=${s.a}, b=${s.b}. Tính A=g^a mod p, B=g^b mod p và khóa chung K.`,
        options: [], answer:`A=${A}, B=${B}, K=${K1}`,
        explanation:`A=${s.g}^${s.a} mod ${s.p}=${A}; B=${s.g}^${s.b} mod ${s.p}=${B}; K=B^a mod p=A^b mod p=${K1}${K1===K2?'':' (kiểm tra lại K2='+K2+')'}.`});
    }
    const affineAs = [3,5,7,11,15,17,19,21,23,25];
    for(let i=0;i<4;i++){
      const a=choice(affineAs,rng), b=Math.floor(rng()*26), x=Math.floor(rng()*26), y=(a*x+b)%26, inv=modInv(a,26);
      qs.push({id:`DYN-AFF-${i}`, type:'calc', lesson:'Bài 3', topic:'Affine', difficulty:3,
        question:`Affine cipher e(x)=ax+b mod 26 với a=${a}, b=${b}. Nếu plaintext có giá trị x=${x}, ciphertext y là gì? Và a^-1 mod 26 bằng bao nhiêu?`,
        options: [], answer:`y=${y}, a^-1=${inv}`,
        explanation:`y=(${a}×${x}+${b}) mod 26=${y}. Vì gcd(${a},26)=${gcd(a,26)}, nghịch đảo tồn tại và a^-1=${inv}.`});
    }
    for(let i=0;i<4;i++){
      const macLen = choice([32,64,96],rng);
      qs.push({id:`DYN-MAC-${i}`, type:'calc', lesson:'Bài 5', topic:'MAC brute-force', difficulty:3,
        question:`Nếu MAC dài ${macLen} bit, số lần thử vét cạn xấp xỉ để giả mạo MAC là bao nhiêu?`,
        options: shuffle([`2^${macLen}`,`2^${macLen-1}`,`${macLen}^2`,`2×${macLen}`,`2^${macLen+16}`],rng), answer:null,
        computedAnswer:`2^${macLen}`, explanation:`Không gian MAC n bit có khoảng 2^n giá trị. Với n=${macLen}, cần xấp xỉ 2^${macLen} lần thử.`});
    }
    const keyLens = [40,56,64,80,112,128,192,256];
    for(let i=0;i<8;i++){
      const n = keyLens[i];
      qs.push({id:`DYN-KEYSPACE-${i}`, type:'calc', lesson:'Bài 3', topic:'Không gian khóa', difficulty:n>=128?3:2,
        question:`Một hệ mã có khóa ${n} bit. Không gian khóa tối đa là bao nhiêu khả năng?`,
        options: shuffle([`2^${n}`,`${n}^2`,`2×${n}`,`10^${n}`,`2^${Math.max(1,n-8)}`],rng), answer:null,
        computedAnswer:`2^${n}`, explanation:`Khóa n bit có 2 lựa chọn cho mỗi bit, nên tổng số khóa là 2^n. Đây là lý do tăng số bit khóa làm vét cạn khó hơn theo cấp số nhân.`});
    }
    const hashLens = [128,160,224,256,384,512];
    for(let i=0;i<6;i++){
      const n = hashLens[i], birthday = Math.floor(n/2);
      qs.push({id:`DYN-HASH-${i}`, type:'mcq', lesson:'Bài 5', topic:'Hash collision', difficulty:3,
        question:`Với hash ${n} bit, độ phức tạp tấn công tìm collision theo birthday bound xấp xỉ là bao nhiêu?`,
        options: shuffle([`2^${birthday}`,`2^${n}`,`${n} lần`,`2^${n-1}`,`Không thể xảy ra collision`],rng), answer:null,
        computedAnswer:`2^${birthday}`, explanation:`Birthday attack làm chi phí tìm va chạm còn khoảng 2^(n/2), không phải 2^n như dò preimage.`});
    }
    const vigItems = [
      {p:'A', k:'D'}, {p:'N', k:'A'}, {p:'T', k:'M'}, {p:'M', k:'K'}, {p:'G', k:'S'}, {p:'Y', k:'B'}
    ];
    for(let i=0;i<6;i++){
      const item = choice(vigItems,rng);
      const x = item.p.charCodeAt(0)-65, y = item.k.charCodeAt(0)-65;
      const c = String.fromCharCode((x+y)%26+65);
      qs.push({id:`DYN-VIG-${i}`, type:'calc', lesson:'Bài 3', topic:'Vigenere', difficulty:3,
        question:`Vigenere dùng A=0. Nếu plaintext là ${item.p} và ký tự khóa là ${item.k}, ciphertext tương ứng là gì?`,
        options: shuffle([c, item.p, item.k, String.fromCharCode((x+y+1)%26+65), String.fromCharCode((x-y+26)%26+65)],rng), answer:null,
        computedAnswer:c, explanation:`Đổi ${item.p}=${x}, ${item.k}=${y}. C=(${x}+${y}) mod 26=${(x+y)%26}, tương ứng ${c}.`});
    }
    const aclScenarios = [
      {id:'STD', ans:'Gần đích', why:'Standard ACL chỉ xét nguồn nên đặt gần đích để tránh chặn nhầm nhiều luồng.'},
      {id:'EXT', ans:'Gần nguồn', why:'Extended ACL xét nguồn/đích/dịch vụ nên đặt gần nguồn để chặn sớm đúng lưu lượng.'},
      {id:'DENY', ans:'Implicit deny', why:'Nếu không có rule permit phù hợp, gói thường bị chặn bởi deny ngầm cuối danh sách.'},
      {id:'ORDER', ans:'Từ trên xuống', why:'ACL được kiểm tra tuần tự; rule đặc hiệu nên đứng trước rule rộng.'}
    ];
    for(let i=0;i<8;i++){
      const s = choice(aclScenarios,rng);
      qs.push({id:`DYN-ACL-${i}`, type:'mcq', lesson:'Bài 8', topic:'ACL vận dụng', difficulty:3,
        question:`Tình huống ACL ${s.id}: lựa chọn nào đúng nhất?`,
        options: shuffle([s.ans,'Gần mọi router biên','Sau rule permit any','Chỉ trong DMZ','Không cần thứ tự rule'],rng), answer:null,
        computedAnswer:s.ans, explanation:s.why});
    }
    const protocolScenarios = [
      {id:'TLS-CERT', lesson:'Bài 6', ans:'Xác thực certificate server', question:'TLS chống MITM chủ yếu nhờ bước nào ngoài mã hóa kênh?', why:'Mã hóa không đủ nếu public key thuộc attacker; certificate hợp lệ giúp gắn public key với đúng server.'},
      {id:'IPSEC-TUNNEL', lesson:'Bài 6', ans:'Tunnel mode', question:'VPN site-to-site cần bọc cả gói IP nội bộ trong gói mới nên chọn gì?', why:'Tunnel mode bảo vệ cả gói IP gốc và thường dùng giữa gateway.'},
      {id:'WIFI-EVIL', lesson:'Bài 7', ans:'Evil Twin', question:'AP giả cùng SSID nhằm lừa người dùng kết nối là dạng nào?', why:'Evil Twin giả mạo điểm truy cập hợp pháp để đánh cắp thông tin hoặc MITM.'},
      {id:'KERB-TGS', lesson:'Bài 6', ans:'TGS', question:'Trong Kerberos, thành phần nào cấp service ticket sau khi client có TGT?', why:'TGS kiểm tra TGT rồi cấp service ticket cho dịch vụ cụ thể.'}
    ];
    for(let i=0;i<10;i++){
      const s = choice(protocolScenarios,rng);
      qs.push({id:`DYN-PROTO-${i}`, type:'mcq', lesson:s.lesson, topic:'Giao thức bảo mật', difficulty:3,
        question:s.question,
        options: shuffle([s.ans,'MAC address','Caesar shift','Packet flood','Port 31337'],rng), answer:null,
        computedAnswer:s.ans, explanation:s.why});
    }
    appendAtmmtMegaDrills(qs, rng, count);
    // Fix MCQ answer indexes after shuffling
    for(const q of qs){
      if(q.options && q.options.length && q.computedAnswer){
        q.answer = q.options.indexOf(q.computedAnswer);
      }
    }
    return qs.slice(0,count);
  }

  function networkDynamicQuestions(seed, count=80){
    const rng = rngFromSeed('network-dynamic-'+seed);
    const qs = [];
    const shuffleOptions = (correct, wrong) => {
      const options = shuffle([correct].concat(wrong), rng).slice(0,5);
      if(!options.includes(correct)) options[Math.floor(rng()*options.length)] = correct;
      return {options, answer: options.indexOf(correct)};
    };

    const ospfCases = [
      {area:'0', rid:'10.10.10.10', passive:'Gi0/2', net:'10.10.12.0/30'},
      {area:'10', rid:'172.16.255.1', passive:'Vlan20', net:'172.16.20.0/24'},
      {area:'20', rid:'192.168.100.254', passive:'Gi0/1', net:'192.168.40.0/24'}
    ];
    for(let i=0;i<8;i++){
      const s = choice(ospfCases,rng);
      const {options, answer} = shuffleOptions(`Area ${s.area}; router-id ${s.rid}; passive ${s.passive}`, [
        `Area 0; router-id tự sinh; passive tất cả interface`,
        `Area ${s.area}; DR luôn là router có IP thấp nhất`,
        `Chạy EIGRP vì có network ${s.net}`,
        `Sai vì wildcard mask không dùng trong OSPF`
      ]);
      qs.push({
        id:`QTM-DYN-OSPF-${i}`, type:'mcq', lesson:'QTM 3 - OSPF & định tuyến', topic:'Đọc cấu hình OSPF', difficulty:3,
        config:`router ospf 10\n router-id ${s.rid}\n passive-interface default\n no passive-interface Gi0/0\n network ${s.net.replace('/30',' 0.0.0.3').replace('/24',' 0.0.0.255')} area ${s.area}`,
        question:'Kết luận nào đúng nhất khi đọc cấu hình OSPF trên router này?',
        options, answer,
        explanation:'OSPF dùng area theo dòng network, router-id được cấu hình thủ công, passive-interface default làm im lặng toàn bộ interface trừ interface được no passive-interface.'
      });
    }

    const stpCases = [
      {a:'32768:0011.2233.4455', b:'24576:aabb.ccdd.eeff', root:'SW-B'},
      {a:'4096:aaaa.bbbb.cccc', b:'8192:0001.0002.0003', root:'SW-A'},
      {a:'32768:0000.0000.000a', b:'32768:0000.0000.0009', root:'SW-B'}
    ];
    for(let i=0;i<6;i++){
      const s = choice(stpCases,rng);
      const {options, answer} = shuffleOptions(s.root, ['SW-A vì tên ngắn hơn','SW-B vì nhiều port hơn','Không xác định nếu chưa biết VLAN native','Router mới là root bridge']);
      qs.push({
        id:`QTM-DYN-STP-${i}`, type:'mcq', lesson:'QTM 2 - Switching, VLAN, STP', topic:'STP root bridge', difficulty:2,
        context:`Bridge ID SW-A = ${s.a}; Bridge ID SW-B = ${s.b}.`,
        question:'Switch nào sẽ được chọn làm root bridge nếu chỉ xét hai thiết bị này?',
        options, answer,
        explanation:'STP chọn Bridge ID nhỏ nhất: priority thấp hơn thắng; nếu priority bằng nhau thì MAC address thấp hơn thắng.'
      });
    }

    const cidrCases = [
      {net:'10.20.30.64/26', usable:'62', first:'10.20.30.65', last:'10.20.30.126', broadcast:'10.20.30.127'},
      {net:'172.16.8.128/27', usable:'30', first:'172.16.8.129', last:'172.16.8.158', broadcast:'172.16.8.159'},
      {net:'192.168.50.16/28', usable:'14', first:'192.168.50.17', last:'192.168.50.30', broadcast:'192.168.50.31'},
      {net:'10.10.10.0/30', usable:'2', first:'10.10.10.1', last:'10.10.10.2', broadcast:'10.10.10.3'}
    ];
    for(let i=0;i<8;i++){
      const s = choice(cidrCases,rng);
      const correct = `${s.usable} host; usable ${s.first} - ${s.last}; broadcast ${s.broadcast}`;
      const {options, answer} = shuffleOptions(correct, [
        `${s.usable} host; usable ${s.first} - ${s.broadcast}; không có broadcast`,
        `${Number(s.usable)+2} host; usable ${s.first} - ${s.last}; broadcast ${s.broadcast}`,
        `${Math.max(1,Number(s.usable)-2)} host; usable ${s.first} - ${s.last}; broadcast ${s.last}`,
        `Không chia subnet được vì ${s.net} là địa chỉ private`
      ]);
      qs.push({
        id:`QTM-DYN-CIDR-${i}`, type:'mcq', lesson:'QTM 1 - IP, subnet, dịch vụ nền', topic:'CIDR/VLSM', difficulty:2,
        question:`Với subnet ${s.net}, phương án nào đúng?`,
        options, answer,
        explanation:'Với subnet IPv4, số host usable thường là 2^(bit host)-2; địa chỉ đầu là network, địa chỉ cuối là broadcast.'
      });
    }

    const dockerCases = [
      {port:'8080:80', seen:'host port 8080 chuyển vào container port 80'},
      {port:'8443:443', seen:'host port 8443 chuyển vào container port 443'},
      {port:'5433:5432', seen:'host port 5433 chuyển vào container port 5432'}
    ];
    for(let i=0;i<5;i++){
      const s = choice(dockerCases,rng);
      const {options, answer} = shuffleOptions(s.seen, [
        'container tự mở toàn bộ port ra Internet',
        'host port và container port phải luôn giống nhau',
        'chỉ container trong cùng bridge network mới truy cập được',
        'đây là bind mount volume, không liên quan network'
      ]);
      qs.push({
        id:`QTM-DYN-DOCKER-${i}`, type:'mcq', lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Docker networking', difficulty:2,
        config:`services:\n  web:\n    image: nginx:alpine\n    ports:\n      - "${s.port}"`,
        question:'Đọc cấu hình Docker Compose, nhận định nào đúng?',
        options, answer,
        explanation:'Cú pháp HOST:CONTAINER trong ports ánh xạ cổng trên máy host vào cổng bên trong container.'
      });
    }

    const aclCases = [
      {wild:'0.0.0.255', match:'một mạng /24'},
      {wild:'0.0.0.3', match:'một mạng /30'},
      {wild:'0.0.15.255', match:'một khối /20'}
    ];
    for(let i=0;i<5;i++){
      const s = choice(aclCases,rng);
      const {options, answer} = shuffleOptions(s.match, ['một host duy nhất','toàn bộ Internet','chỉ gói TCP SYN','chỉ VLAN native']);
      qs.push({
        id:`QTM-DYN-ACL-${i}`, type:'mcq', lesson:'QTM 4 - ACL, NAT, firewall', topic:'Wildcard mask', difficulty:2,
        question:`Trong ACL Cisco, wildcard mask ${s.wild} thường khớp với phạm vi nào?`,
        options, answer,
        explanation:'Wildcard mask là phần đảo của subnet mask: bit 0 phải khớp chính xác, bit 1 được bỏ qua.'
      });
    }

    appendNetworkMegaDrills(qs, rng, count, shuffleOptions);
    return qs.slice(0,count);
  }

  function appendAtmmtMegaDrills(qs, rng, targetCount){
    if(qs.length >= targetCount) return;
    const concepts = [
      {lesson:'Bài 1', topic:'Confidentiality', cue:'dữ liệu bị người không có quyền đọc được', correct:'Ưu tiên mã hóa, phân quyền truy cập và bảo vệ kênh truyền để giữ tính bí mật', wrongs:['Chỉ tăng băng thông để giảm trễ truy cập','Tập trung non-repudiation dù chưa có tranh chấp người gửi','Tắt toàn bộ log để tránh lộ thông tin vận hành','Đổi địa chỉ IP gateway nhưng không kiểm soát quyền đọc'], explanation:'Confidentiality tập trung ngăn lộ thông tin cho chủ thể không được phép.'},
      {lesson:'Bài 1', topic:'Integrity', cue:'dữ liệu bị sửa trên đường truyền', correct:'Dùng hash/MAC/chữ ký số hoặc cơ chế kiểm toàn vẹn để phát hiện sửa đổi', wrongs:['Chỉ nén dữ liệu trước khi gửi','Chỉ đổi SSID Wi-Fi mà không kiểm chứng nội dung','Tăng số lần retry TCP để tránh mất gói','Tắt xác thực vì dữ liệu vẫn đọc được'], explanation:'Integrity trả lời câu hỏi dữ liệu có còn nguyên vẹn hay đã bị sửa.'},
      {lesson:'Bài 1', topic:'Availability', cue:'dịch vụ hợp lệ bị làm quá tải hoặc không truy cập được', correct:'Thiết kế chống DoS, dự phòng, giới hạn lưu lượng và giám sát để giữ dịch vụ sẵn sàng', wrongs:['Chỉ dùng chữ ký số cho từng request','Chỉ đổi thuật toán mã hóa đối xứng','Chặn mọi người dùng kể cả người hợp lệ','Tập trung chứng minh người gửi không thể chối bỏ'], explanation:'Availability là khả năng cung cấp dịch vụ cho người dùng hợp lệ khi cần.'},
      {lesson:'Bài 1', topic:'Replay attack', cue:'gói xác thực cũ bị gửi lại nhưng vẫn được chấp nhận', correct:'Dùng nonce, timestamp, số thứ tự hoặc đánh dấu token đã dùng để chống phát lại', wrongs:['Tăng độ dài username nhưng cho phép dùng lại OTP','Chỉ đổi port dịch vụ sang số khác','Bỏ kiểm tra thời gian để giảm lỗi đồng bộ','Dùng cùng ticket lâu dài cho nhiều phiên'], explanation:'Replay lợi dụng thông điệp hợp lệ cũ; cần cơ chế phân biệt phiên/lần dùng.'},
      {lesson:'Bài 1', topic:'MITM', cue:'kẻ tấn công đứng giữa thay khóa công khai', correct:'Xác thực endpoint/khóa công khai bằng certificate hoặc chữ ký số trước khi tin khóa', wrongs:['Chỉ tăng kích thước khóa DH là tự hết MITM','Chuyển sang HTTP để giảm cảnh báo chứng chỉ','Gửi private key qua kênh công khai cho tiện kiểm tra','Tắt kiểm tra hostname trong chứng chỉ'], explanation:'Trao đổi khóa không xác thực vẫn có thể bị người đứng giữa thay khóa.'},
      {lesson:'Bài 2a', topic:'Worm', cue:'mã độc tự lan qua mạng không cần người dùng sao chép thủ công', correct:'Worm tự khai thác mạng/dịch vụ để lan truyền sang máy khác', wrongs:['Virus luôn chỉ là email rác không thể lây file','Trojan tự nhân bản nhanh hơn worm theo định nghĩa','Spyware chủ yếu làm cạn băng thông bằng flood','Rootkit là chương trình nén file hợp pháp'], explanation:'Worm nhấn mạnh khả năng tự lan truyền qua mạng.'},
      {lesson:'Bài 2a', topic:'Trojan', cue:'phần mềm giả hữu ích nhưng cài chức năng độc hại', correct:'Trojan đánh lừa người dùng chạy chương trình tưởng hợp pháp để thực thi hành vi độc hại', wrongs:['Trojan bắt buộc phải tự lây qua mọi host trong LAN','Trojan là thuật toán mã hóa khối','Trojan chỉ xảy ra khi DNS bị sai bản ghi','Trojan luôn cần OSPF area mismatch'], explanation:'Trojan dựa trên ngụy trang/chức năng ẩn, không nhất thiết tự nhân bản.'},
      {lesson:'Bài 2a', topic:'Rootkit', cue:'mã độc che giấu tiến trình, file hoặc quyền kiểm soát', correct:'Rootkit tập trung ẩn mình và duy trì quyền kiểm soát khó phát hiện', wrongs:['Rootkit chỉ là chính sách backup định kỳ','Rootkit làm nhiệm vụ cấp DHCP lease','Rootkit chỉ dùng để chọn root bridge STP','Rootkit luôn là một dạng chữ ký số hợp lệ'], explanation:'Rootkit thường can thiệp sâu để che dấu dấu vết và quyền truy cập.'},
      {lesson:'Bài 3', topic:'Caesar cipher', cue:'dịch mỗi chữ cái theo cùng một khóa k', correct:'Caesar là mã thay thế đơn giản với C=(P+k) mod 26', wrongs:['Caesar dùng hai khóa công khai và bí mật như RSA','Caesar chia block 128 bit như AES','Caesar tạo MAC có khóa bí mật','Caesar yêu cầu certificate từ CA'], explanation:'Caesar là mã cổ điển, dễ bị vét cạn vì không gian khóa nhỏ.'},
      {lesson:'Bài 3', topic:'Vigenere', cue:'khóa chữ lặp lại để cộng với plaintext', correct:'Vigenere dùng nhiều dịch chuyển Caesar theo chuỗi khóa lặp', wrongs:['Vigenere là mode vận hành của firewall stateful','Vigenere luôn tạo chữ ký số không thể chối bỏ','Vigenere bắt buộc dùng cặp khóa RSA','Vigenere tự phát hiện replay attack'], explanation:'Vigenere cải tiến Caesar bằng khóa lặp nhưng vẫn là mã cổ điển.'},
      {lesson:'Bài 3', topic:'One-time pad', cue:'khóa ngẫu nhiên dài bằng thông điệp và dùng đúng một lần', correct:'OTP chỉ an toàn hoàn hảo khi khóa thật ngẫu nhiên, dài bằng bản rõ và không tái sử dụng', wrongs:['OTP vẫn an toàn nếu dùng lại cùng khóa cho nhiều bản tin','OTP cần khóa ngắn hơn bản rõ để dễ nhớ','OTP là tên khác của NAT overload','OTP chỉ phụ thuộc vào certificate TLS'], explanation:'Dùng lại khóa OTP làm lộ quan hệ giữa các plaintext.'},
      {lesson:'Bài 3', topic:'ECB mode', cue:'các block plaintext giống nhau cho ciphertext giống nhau', correct:'ECB làm lộ mẫu lặp vì mỗi block được mã hóa độc lập', wrongs:['ECB luôn cung cấp xác thực nguồn gửi','ECB tự thêm IV ngẫu nhiên cho mỗi block','ECB là mode được khuyên dùng cho ảnh/tập tin có mẫu lặp','ECB chống replay tốt hơn timestamp'], explanation:'ECB là bẫy kinh điển khi hỏi về mode mã khối.'},
      {lesson:'Bài 4', topic:'RSA', cue:'n=pq, phi(n), e và d là nghịch đảo modulo', correct:'RSA dựa trên khó phân tích n=pq và cần chọn e,d thỏa e*d ≡ 1 mod phi(n)', wrongs:['RSA dùng chung một khóa bí mật cho hai bên','RSA không cần số nguyên tố p và q','RSA bảo mật nhờ giấu thuật toán thay vì giấu khóa','RSA chỉ dùng để tạo VLAN trunk'], explanation:'RSA là hệ khóa công khai, thường hỏi n, phi(n), e, d và vai trò public/private key.'},
      {lesson:'Bài 4', topic:'Diffie-Hellman', cue:'hai bên tạo khóa chung qua kênh công khai', correct:'DH tạo shared secret nhưng cần xác thực để tránh MITM', wrongs:['DH tự chứng minh danh tính hai bên trong mọi trường hợp','DH là thuật toán hash một chiều','DH yêu cầu gửi trực tiếp private key cho đối phương','DH thay thế hoàn toàn certificate trong TLS'], explanation:'DH giải quyết trao đổi khóa, không tự giải quyết xác thực danh tính.'},
      {lesson:'Bài 5', topic:'Hash one-way', cue:'từ digest khó khôi phục message gốc', correct:'Hàm băm tốt có tính một chiều và chống tìm tiền ảnh', wrongs:['Hash luôn giải mã ngược được bằng public key','Hash có khóa bí mật giống HMAC trong mọi trường hợp','Hash dùng để nén ảnh lossless trong bài này','Hash bắt buộc giữ nguyên độ dài bản tin'], explanation:'Hash không khóa khác MAC/HMAC; thuộc tính một chiều rất hay ra thi.'},
      {lesson:'Bài 5', topic:'Collision resistance', cue:'khó tìm hai bản tin khác nhau cùng digest', correct:'Chống va chạm nghĩa là khó tìm m1 khác m2 nhưng H(m1)=H(m2)', wrongs:['Collision là khi server bị tràn băng thông','Collision nghĩa là plaintext bằng ciphertext','Collision chỉ liên quan đến VLAN native mismatch','Collision làm certificate tự gia hạn'], explanation:'Collision resistance khác preimage resistance.'},
      {lesson:'Bài 5', topic:'HMAC/MAC', cue:'kiểm tra toàn vẹn kèm xác thực bằng khóa bí mật chia sẻ', correct:'HMAC/MAC dùng khóa bí mật nên phát hiện sửa đổi và xác thực bên biết khóa', wrongs:['MAC không cần khóa nên ai cũng tạo được hợp lệ','MAC cung cấp non-repudiation mạnh như chữ ký số','MAC chỉ dùng để đổi địa chỉ MAC của card mạng','MAC giải mã nội dung giống AES'], explanation:'MAC/HMAC khác hash thường ở yếu tố khóa bí mật.'},
      {lesson:'Bài 5', topic:'Digital signature', cue:'chống chối bỏ và xác minh bằng public key', correct:'Người ký dùng private key, người nhận dùng public key để xác minh chữ ký', wrongs:['Người ký dùng public key để ký và private key để công bố','Chữ ký số chỉ là hash không có khóa','Chữ ký số bắt buộc hai bên chia sẻ cùng secret','Chữ ký số không cần kiểm tra certificate/khóa công khai'], explanation:'Chữ ký số gắn với private key của người ký và hỗ trợ non-repudiation.'},
      {lesson:'Bài 6', topic:'TLS certificate', cue:'trình duyệt cảnh báo chứng chỉ sai tên miền/không tin cậy', correct:'Không nên bỏ qua cảnh báo vì có thể đang bị MITM hoặc server giả mạo', wrongs:['Bỏ qua cảnh báo giúp tăng bảo mật vì khóa dài hơn','Certificate sai vẫn chứng minh đúng danh tính server','TLS chỉ cần mã hóa, không cần xác thực server','Cảnh báo certificate chỉ ảnh hưởng giao diện'], explanation:'TLS cần xác thực certificate để biết public key thuộc đúng server.'},
      {lesson:'Bài 6', topic:'IPsec tunnel mode', cue:'bọc cả gói IP nội bộ trong gói IP mới qua Internet', correct:'Tunnel mode phù hợp VPN site-to-site giữa gateway/chi nhánh', wrongs:['Transport mode luôn bọc cả header IP gốc trong header mới','IPsec tunnel mode là một loại Wi-Fi Evil Twin','Tunnel mode chỉ dùng để cấp DHCP','IPsec không cần chính sách xác thực/khóa'], explanation:'IPsec tunnel mode thường dùng cho VPN gateway-to-gateway.'},
      {lesson:'Bài 6', topic:'Kerberos', cue:'client dùng ticket thay vì gửi mật khẩu cho từng dịch vụ', correct:'Kerberos dùng KDC, TGT, service ticket và khóa phiên để xác thực', wrongs:['Kerberos loại bỏ hoàn toàn nhu cầu đồng bộ thời gian','Kerberos là thuật toán mã hóa cổ điển thay thế Caesar','Kerberos gửi mật khẩu plaintext cho mọi server','Kerberos chỉ hoạt động khi tắt DNS nội bộ'], explanation:'Kerberos thường bẫy ở vai trò KDC/TGT/TGS và thời gian.'},
      {lesson:'Bài 7', topic:'Evil Twin', cue:'AP giả cùng SSID để lừa người dùng kết nối', correct:'Evil Twin giả mạo điểm truy cập hợp pháp để đánh cắp thông tin hoặc MITM', wrongs:['Evil Twin là cách chọn root bridge trong STP','Evil Twin chỉ là mật khẩu Wi-Fi dài hơn','Evil Twin là mode AES bảo mật hơn GCM','Evil Twin luôn cần truy cập vật lý vào switch core'], explanation:'Wi-Fi hay hỏi phân biệt AP giả, deauth, bắt handshake và WEP/WPA.'},
      {lesson:'Bài 7', topic:'WPA handshake', cue:'attacker deauth client để bắt quá trình kết nối lại', correct:'Deauth ép client bắt tay lại để attacker thu handshake rồi thử passphrase offline', wrongs:['Deauth trực tiếp giải mã được mọi gói tin AES','Bắt handshake là đã biết ngay mật khẩu Wi-Fi','Chỉ cần đổi kênh sóng là phá được WPA2','Handshake không liên quan đến xác thực Wi-Fi'], explanation:'Deauth là bước tạo cơ hội thu handshake, không tự bẻ khóa.'},
      {lesson:'Bài 8', topic:'Stateful firewall', cue:'gói phản hồi thuộc phiên hợp lệ được cho qua', correct:'Stateful firewall theo dõi trạng thái phiên để xử lý traffic trả về hợp lệ', wrongs:['Stateful firewall không cần rule nào cả','Stateful firewall đọc được toàn bộ HTTPS sau mã hóa','Stateful firewall chỉ lọc theo địa chỉ MAC','Stateful firewall thay thế hoàn toàn antivirus'], explanation:'Stateful khác stateless packet filter ở việc nhớ trạng thái kết nối.'},
      {lesson:'Bài 8', topic:'DMZ', cue:'dịch vụ public không nên đặt thẳng trong LAN nội bộ', correct:'Đưa dịch vụ public vào DMZ và chỉ mở luồng tối thiểu theo least privilege', wrongs:['Đặt database nội bộ public trực tiếp để dễ truy cập','Cho phép any-any giữa Internet và LAN để giảm lỗi','Tắt log firewall ở vùng DMZ','Đặt web public chung máy domain controller'], explanation:'DMZ giảm rủi ro lan vào LAN nội bộ khi dịch vụ public bị tấn công.'}
    ];
    const scenarios = [
      'cổng đăng nhập sinh viên', 'hệ thống email nội bộ', 'máy chủ web trong DMZ', 'file chia sẻ phòng ban',
      'VPN truy cập từ xa', 'ứng dụng ngân hàng giả lập', 'máy chủ cơ sở dữ liệu', 'mạng Wi-Fi phòng lab',
      'dịch vụ API có TLS', 'hệ thống xác thực OTP', 'máy trạm nghi nhiễm mã độc', 'kênh trao đổi khóa công khai',
      'log firewall cuối ngày', 'gói tin bắt được bằng Wireshark', 'máy chủ AD/Kerberos', 'bản sao lưu cấu hình'
    ];
    const forms = [
      (c, s) => `Trong tình huống ${s}, đề nhấn mạnh "${c.cue}". Nhận định nào đúng nhất?`,
      (c, s) => `Khi ôn ${c.topic} cho ${s}, phương án nào bám sát lý thuyết trong slide nhất?`,
      (c, s) => `Nếu câu hỏi yêu cầu phân biệt ${c.topic} với các khái niệm gần giống trong ${s}, điểm mấu chốt là gì?`,
      (c, s) => `Một sự cố ở ${s} có dấu hiệu: ${c.cue}. Cách hiểu/biện pháp nào đúng trọng tâm?`
    ];
    let index = 0;
    while(qs.length < targetCount && index < targetCount * 5){
      const c = concepts[index % concepts.length];
      const s = scenarios[Math.floor(index / concepts.length) % scenarios.length];
      const form = forms[Math.floor(index / (concepts.length * scenarios.length)) % forms.length];
      const options = shuffle([c.correct].concat(c.wrongs), rng).slice(0,5);
      if(!options.includes(c.correct)) options[Math.floor(rng()*options.length)] = c.correct;
      qs.push({
        id:`DYN-ATMMT-MEGA-${String(index + 1).padStart(4,'0')}`,
        type:'mcq',
        lesson:c.lesson,
        topic:c.topic,
        difficulty:index % 5 === 0 ? 3 : 2,
        question:form(c, s),
        options,
        answer:options.indexOf(c.correct),
        explanation:`${c.explanation} Bẫy thường gặp là chọn phương án nghe có vẻ bảo mật nhưng không xử lý đúng dấu hiệu: ${c.cue}.`
      });
      index++;
    }
  }

  function extraNetworkDrills(){
    return [
      {lesson:'QTM 1 - IP, subnet, dịch vụ nền', topic:'Default gateway', clue:'PC cùng VLAN ping được nhau nhưng không ra khác mạng', correct:'Kiểm tra default gateway trên PC, trạng thái SVI/gateway, route và ACL giữa các VLAN', wrongs:['Đổi DNS là đủ vì DNS quyết định mọi gói IP','Tắt STP toàn mạng để gói đi xa hơn','Tạo NAT static cho từng PC trong VLAN','Chỉ đổi hostname switch access'], config:'PC 192.168.20.25/24; gateway khai báo 192.168.20.254 nhưng SVI thực tế là 192.168.20.1.'},
      {lesson:'QTM 1 - IP, subnet, dịch vụ nền', topic:'IP conflict', clue:'hai máy thỉnh thoảng rớt mạng và log báo duplicate IP', correct:'Tìm thiết bị trùng IP, kiểm DHCP reservation/static IP, ARP table và dải cấp phát DHCP', wrongs:['Tăng OSPF cost trên uplink','Mở thêm port 22 inbound','Đổi native VLAN không cần kiểm IP','Xóa toàn bộ DNS zone'], config:'DHCP pool 192.168.10.50-192.168.10.200; một máy in đặt static 192.168.10.88.'},
      {lesson:'QTM 1 - IP, subnet, dịch vụ nền', topic:'DHCP scope', clue:'một VLAN nhận được IP sai dải của VLAN khác', correct:'Kiểm tra VLAN access/trunk, DHCP relay, scope tương ứng subnet và có server DHCP giả hay không', wrongs:['Bật PortFast sẽ tự sửa dải DHCP','Đổi cipher suite TLS','Chỉ tăng lease time','Tắt default route Internet'], config:'VLAN 30 đáng lẽ nhận 192.168.30.0/24 nhưng client nhận 192.168.10.x.'},
      {lesson:'QTM 1 - IP, subnet, dịch vụ nền', topic:'DNS split horizon', clue:'trong LAN truy cập domain public trỏ nhầm ra IP ngoài thay vì server nội bộ', correct:'Kiểm tra DNS nội bộ, split DNS/hairpin NAT và bản ghi A tương ứng môi trường trong LAN', wrongs:['Đổi STP root bridge','Chỉ mở thêm UDP 67/68','Tăng MTU trên trunk','Xóa mọi bản ghi MX'], config:'app.company.vn public = 203.0.113.10; server nội bộ = 10.10.30.20.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'Linux command', clue:'service nginx báo inactive sau khi reboot server', correct:'Dùng systemctl status/start/enable để kiểm tra, khởi động và bật service chạy cùng hệ thống', wrongs:['Thêm VLAN vào trunk là đủ','Đổi OSPF area trên router','Tạo NAT overload cho service local','Chỉ đổi DNS public'], config:'systemctl status nginx -> inactive; journalctl -u nginx có lỗi bind port.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'Linux command', clue:'service báo active nhưng client không truy cập được port từ máy khác', correct:'Dùng ss -tulpn kiểm tra process listen IP/port, sau đó kiểm firewall host và route tới server', wrongs:['Active nghĩa là chắc chắn nghe trên mọi interface','Chỉ đổi default gateway PC','Tăng STP priority','Xóa bản ghi DNS MX'], config:'ss -tulpn thấy 127.0.0.1:8080 thay vì 0.0.0.0:8080.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'Linux command', clue:'server Linux ping LAN được nhưng không ra Internet sau khi đổi gateway', correct:'Dùng ip route kiểm default route, gateway hợp lệ cùng subnet và metric của route', wrongs:['Kiểm tra BPDU Guard đầu tiên','Đổi Service Kubernetes sang NodePort','Thêm CNAME DNS là đủ','Tắt toàn bộ ACL trên core'], config:'ip route không có default via gateway hoặc gateway nằm sai subnet.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'Active Directory', clue:'máy Windows join domain thất bại dù ping được IP domain controller', correct:'Kiểm tra DNS client trỏ về DNS/DC nội bộ, bản ghi SRV, đồng bộ thời gian và quyền join domain', wrongs:['Đổi native VLAN là đủ','Dùng NAT overload cho DC','Tăng OSPF cost','Scale thêm Pod CoreDNS'], config:'Client đang dùng DNS 8.8.8.8, domain nội bộ là corp.local.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'Active Directory', clue:'domain controller dự phòng không đồng bộ user mới', correct:'Kiểm tra replication giữa DC/ADC, DNS, site link, thời gian và log Directory Service', wrongs:['Đổi trunk allowed VLAN cho mọi port','Bật Docker volume','Chỉ flush DNS trên web server','Tắt firewall toàn mạng'], config:'repadmin /replsummary báo lỗi replication giữa DC1 và ADC1.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'Active Directory', clue:'user đã đổi policy nhưng máy client chưa nhận cấu hình mới', correct:'Kiểm tra OU/link GPO, security filtering, gpupdate /force, gpresult và đồng bộ DC', wrongs:['Đổi router-id OSPF','Mở port FTP passive','Tạo NAT static cho client','Xóa DHCP scope'], config:'gpresult không thấy GPO mới áp dụng cho user/máy.'},
      {lesson:'QTM 2 - Switching, VLAN, STP', topic:'Access VLAN sai', clue:'máy phòng kế toán cắm vào port mới nhưng nhận IP của VLAN sinh viên', correct:'Kiểm tra switchport access vlan, profile port, mô tả cổng và DHCP scope nhận được', wrongs:['Đổi OSPF area trên router biên','Mở NAT overload trên server DNS','Tăng replica Kubernetes','Chỉ đổi password Wi-Fi'], config:'interface Gi0/18\n switchport mode access\n switchport access vlan 40'},
      {lesson:'QTM 2 - Switching, VLAN, STP', topic:'EtherChannel mismatch', clue:'hai uplink cấu hình channel-group nhưng port-channel không lên', correct:'Kiểm tra mode LACP/PAgP hai đầu, speed/duplex, native/allowed VLAN và cấu hình member port đồng nhất', wrongs:['Tạo DHCP reservation cho port-channel','Đổi CA certificate','Mở ICMP trên firewall là đủ','Xóa toàn bộ VLAN database'], config:'SW1 channel-group 1 mode active; SW2 channel-group 1 mode on.'},
      {lesson:'QTM 2 - Switching, VLAN, STP', topic:'Port security', clue:'cổng access bị err-disabled sau khi thay máy người dùng', correct:'Kiểm tra port-security sticky/static MAC, violation mode và recovery trước khi cho thiết bị mới hoạt động', wrongs:['Đổi OSPF router-id','Tăng timeout HAProxy','Đổi subnet mask thành /30','Tắt backup cấu hình'], config:'switchport port-security\nswitchport port-security mac-address sticky'},
      {lesson:'QTM 3 - OSPF & định tuyến', topic:'Route chiều về', clue:'từ VLAN user ping tới server qua WAN có request đi nhưng reply không quay lại', correct:'Kiểm tra route chiều về trên server/gateway phía đích, default route, NAT và ACL stateful', wrongs:['Chỉ đổi DNS client','Tạo VLAN native mới','Tăng DHCP lease time','Đổi bridge priority'], config:'User 10.10.20.0/24 -> Server 172.16.50.10; server gateway thiếu route về 10.10.20.0/24.'},
      {lesson:'QTM 3 - OSPF & định tuyến', topic:'OSPF network mask', clue:'một subnet connected không xuất hiện trong OSPF database', correct:'Kiểm tra network statement/wildcard mask, interface up/up, passive-interface và area đang gán', wrongs:['Bật NAT overload trên interface đó','Đổi DNS suffix','Tắt spanning-tree toàn mạng','Chỉ thêm CNAME'], config:'interface Vlan60 ip 192.168.60.1/24; network 192.168.6.0 0.0.0.255 area 0.'},
      {lesson:'QTM 3 - OSPF & định tuyến', topic:'Metric chọn đường', clue:'đường backup bị chọn làm primary dù băng thông thấp hơn', correct:'Kiểm tra OSPF cost/reference-bandwidth, bandwidth interface và chính sách route redistribution nếu có', wrongs:['Đổi DHCP pool','Mở port SMB public','Xóa all firewall rules','Tăng số Pod frontend'], config:'WAN chính 1Gbps cost 100; WAN backup 100Mbps cost 10.'},
      {lesson:'QTM 4 - ACL, NAT, firewall', topic:'Implicit deny', clue:'sau khi thêm ACL chỉ có một rule permit SSH thì web và DNS bị mất', correct:'Nhớ implicit deny cuối ACL; thêm các permit cần thiết đúng thứ tự và đúng chiều', wrongs:['ACL tự permit mọi traffic còn lại','Đổi STP priority sẽ mở web','Chỉ đổi DNS resolver','Tăng MTU là đủ'], config:'ip access-list extended MGMT-IN\n permit tcp 10.10.99.0 0.0.0.255 any eq 22'},
      {lesson:'QTM 4 - ACL, NAT, firewall', topic:'Hairpin NAT', clue:'người dùng nội bộ truy cập tên miền public của server nội bộ thì lỗi, ngoài Internet lại được', correct:'Kiểm tra split DNS hoặc hairpin NAT/NAT reflection và rule firewall nội bộ tới server', wrongs:['Tắt DNS nội bộ vĩnh viễn','Đổi OSPF area sang NSSA','Chỉ mở UDP 67','Chuyển access port sang trunk cho PC'], config:'LAN client -> public IP firewall -> DNAT về web server DMZ.'},
      {lesson:'QTM 4 - ACL, NAT, firewall', topic:'Rule direction', clue:'ACL đúng địa chỉ nhưng đặt sai chiều nên traffic vẫn đi qua', correct:'Xác định interface và chiều inbound/outbound theo hướng gói đi rồi áp ACL tại điểm phù hợp', wrongs:['ACL có tên đúng thì chiều nào cũng chạy','Đặt ACL trên loopback là đủ cho mọi luồng','Chỉ thêm deny cuối cùng','Đổi DNS zone'], config:'deny Student -> Management đặt outbound trên interface Student thay vì inbound đúng hướng.'},
      {lesson:'QTM 4 - ACL, NAT, firewall', topic:'DNAT port forward', clue:'public IP mở port 8080 nhưng web server nội bộ nghe port 80', correct:'Kiểm tra static PAT/DNAT public:8080 tới private:80, ACL outside-in và route trả lời', wrongs:['Host port và server port bắt buộc giống nhau','Chỉ đổi VLAN native','Tạo thêm DHCP relay','Tắt service web'], config:'203.0.113.10:8080 -> 10.10.30.50:80.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'Linux firewall', clue:'dịch vụ nginx active nhưng máy khác không truy cập được port 80', correct:'Kiểm tra service listen address, ss/netstat, firewall ufw/iptables/nftables và route tới server', wrongs:['Nginx active là chắc chắn truy cập được từ xa','Đổi OSPF area trên switch access','Tăng Docker replica','Xóa DNS MX'], config:'systemctl status nginx active; ss -lntp thấy 127.0.0.1:80.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'OpenVPN DNS push', clue:'VPN truy cập IP nội bộ được nhưng không phân giải tên nội bộ', correct:'Kiểm tra push DNS/search-domain cho client VPN, route tới DNS và firewall UDP/TCP 53', wrongs:['Đổi port OpenVPN là đủ','Tắt DNS server nội bộ','Chỉ mở SMB 445','Đổi native VLAN'], config:'push "dhcp-option DNS 10.10.10.5" chưa có trong server.conf.'},
      {lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Docker bridge subnet conflict', clue:'container không đi được tới LAN vì subnet docker trùng subnet công ty', correct:'Đổi subnet Docker bridge/custom network tránh trùng, kiểm route host và firewall forwarding', wrongs:['Scale thêm container sẽ hết trùng subnet','Đổi DNS CNAME','Mở port 443 public','Tắt STP'], config:'docker0 = 172.17.0.0/16; LAN công ty cũng dùng 172.17.20.0/24.'},
      {lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Readiness probe', clue:'Pod Running nhưng Service không chuyển traffic tới Pod', correct:'Kiểm tra readinessProbe, endpoint, selector và cổng container/service', wrongs:['Pod Running luôn nhận traffic Service','Đổi VLAN native','Mở NAT overload','Tắt DNS zone'], config:'kubectl get endpoints api-svc trả về empty; Pod condition Ready=False.'},
      {lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Cloud private subnet', clue:'VM private subnet không ra Internet cập nhật package được', correct:'Kiểm tra route table tới NAT gateway/instance, security group outbound và NACL', wrongs:['Gán public IP cho database private là cách duy nhất','Đổi STP priority','Xóa service selector','Chỉ thêm DNS MX'], config:'Private subnet default route chưa trỏ tới NAT gateway.'},
      {lesson:'QTM 7 - Automation & vận hành', topic:'Rollback plan', clue:'cập nhật firewall thành công trên CLI nhưng phát hiện mất VPN chi nhánh', correct:'Dùng rollback theo bản backup/diff đã chuẩn bị, kiểm lại luồng VPN và ghi nhận nguyên nhân', wrongs:['Tiếp tục sửa tay không lưu lại thay đổi','Xóa luôn ACL để nhanh có mạng','Đổi DNS public','Tắt backup định kỳ'], config:'ACL mới chặn UDP 500/4500 và ESP giữa hai peer VPN.'}
    ];
  }

  function appendNetworkMegaDrills(qs, rng, targetCount, shuffleOptions){
    if(qs.length >= targetCount) return;
    const drills = [
      {lesson:'QTM 1 - IP, subnet, dịch vụ nền', topic:'DHCP relay', clue:'client khác VLAN không nhận được IP từ DHCP server trung tâm', correct:'Kiểm tra ip helper-address/DHCP relay trên gateway VLAN, scope DHCP, route và firewall UDP 67/68', wrongs:['Đổi native VLAN là đủ dù DHCP server ở khác mạng','Chỉ xóa ARP cache trên client','Tăng OSPF cost trên WAN','Mở port 443 cho DHCP'], config:'Client VLAN 20, DHCP server 192.168.10.5 ở VLAN 10; gateway VLAN 20 là Core SVI.'},
      {lesson:'QTM 1 - IP, subnet, dịch vụ nền', topic:'DNS nội bộ', clue:'truy cập bằng IP được nhưng bằng tên server thì lỗi', correct:'Kiểm tra DNS client đang trỏ về DNS nội bộ, bản ghi A/CNAME và vùng DNS liên quan', wrongs:['Đổi subnet mask thành /30 để DNS nhanh hơn','Bật PortFast trên access port','Xóa default route ra Internet','Tắt firewall trên mọi máy'], config:'ping 192.168.30.20 OK; ping filesrv.local failed.'},
      {lesson:'QTM 1 - IP, subnet, dịch vụ nền', topic:'Subnet/VLSM', clue:'cần cấp ít nhất 60 host cho một VLAN', correct:'Chọn /26 vì có 62 địa chỉ usable, đủ cho 60 host và ít lãng phí hơn /25', wrongs:['Chọn /27 vì có 64 host usable','Chọn /30 vì tiết kiệm nhất cho người dùng','Chọn /24 vì mọi VLAN bắt buộc /24','Không cần tính network/broadcast'], config:'VLAN Staff cần >=60 host; IPv4 private 192.168.10.0/24.'},
      {lesson:'QTM 2 - Switching, VLAN, STP', topic:'Trunk allowed VLAN', clue:'VLAN mới tạo không đi qua uplink tới core', correct:'Kiểm tra VLAN có tồn tại hai đầu và được thêm vào allowed VLAN trên trunk', wrongs:['Đổi OSPF router-id để VLAN đi qua trunk','Mở NAT overload trên switch access','Tạo thêm DNS CNAME cho VLAN','Tắt toàn bộ STP trên switch'], config:'switchport mode trunk\nswitchport trunk allowed vlan 10,20'},
      {lesson:'QTM 2 - Switching, VLAN, STP', topic:'Native VLAN mismatch', clue:'log báo native VLAN mismatch trên hai đầu trunk', correct:'Đồng bộ native VLAN hai đầu trunk hoặc chuyển native VLAN sang VLAN không dùng cho user', wrongs:['Tăng DHCP lease time','Đổi area OSPF sang area 0','Scale thêm Pod backend','Mở FTP passive port'], config:'SW1 native VLAN 99; SW2 native VLAN 1.'},
      {lesson:'QTM 2 - Switching, VLAN, STP', topic:'STP root bridge', clue:'switch không mong muốn trở thành root bridge', correct:'Cấu hình priority thấp hơn cho switch core/distribution mong muốn làm root bridge', wrongs:['Đổi hostname switch access là đủ','Tăng số VLAN trên access switch','Tắt trunk allowed VLAN','Tạo NAT static cho core'], config:'Access switch có priority thấp hơn core sau khi thêm thiết bị cũ.'},
      {lesson:'QTM 2 - Switching, VLAN, STP', topic:'BPDU Guard', clue:'cổng access err-disabled sau khi cắm thêm switch nhỏ', correct:'BPDU Guard bảo vệ cổng PortFast; cần gỡ thiết bị gây BPDU và recovery có kiểm soát', wrongs:['BPDU Guard dùng để tăng tốc OSPF neighbor','Cứ tắt STP toàn mạng là xong','Chuyển cổng sang trunk cho mọi endpoint','Mở port 80 trên firewall'], config:'spanning-tree portfast\nspanning-tree bpduguard enable'},
      {lesson:'QTM 3 - OSPF & định tuyến', topic:'OSPF area mismatch', clue:'hai router ping trực tiếp được nhưng OSPF không lên FULL', correct:'Kiểm tra area ID, subnet/mask, hello/dead timer, authentication và passive-interface', wrongs:['Bật NAT overload là OSPF lên FULL','Đổi DNS server của router','Tạo VLAN native mới','Xóa toàn bộ static route trước khi kiểm tra'], config:'R1 area 0; R2 area 10 trên cùng link 10.0.12.0/30.'},
      {lesson:'QTM 3 - OSPF & định tuyến', topic:'Passive interface', clue:'mạng được quảng bá nhưng không lập neighbor trên interface đó', correct:'passive-interface không gửi Hello trên interface nhưng prefix vẫn có thể được quảng bá nếu match network', wrongs:['passive-interface xóa luôn route khỏi OSPF database','passive-interface chỉ dùng cho NAT','passive-interface làm router-id trùng nhau','passive-interface bắt buộc tắt mọi SVI'], config:'router ospf 1\n passive-interface default\n no passive-interface Gi0/0'},
      {lesson:'QTM 3 - OSPF & định tuyến', topic:'Default route OSPF', clue:'router biên cần phát default route cho mạng nội bộ', correct:'Có default route trong routing table rồi dùng default-information originate, hoặc dùng always khi phù hợp', wrongs:['Mọi router phải có router-id giống nhau','Chỉ cần tạo VLAN 1 làm native','Default route chỉ quảng bá nếu là route connected','OSPF không hỗ trợ default route'], config:'ip route 0.0.0.0 0.0.0.0 203.0.113.1\nrouter ospf 10\n default-information originate'},
      {lesson:'QTM 4 - ACL, NAT, firewall', topic:'ACL order', clue:'permit host đặc biệt đứng sau deny rộng hơn', correct:'ACL xử lý từ trên xuống; rule deny rộng đứng trước sẽ chặn trước khi tới permit đặc hiệu', wrongs:['Rule permit luôn ưu tiên cao hơn deny','ACL chỉ kiểm tra dòng cuối cùng','Extended ACL không lọc port TCP','Tên ACL càng dài càng ưu tiên'], config:'deny tcp any host 10.10.10.20 eq 443\npermit tcp host 203.0.113.5 host 10.10.10.20 eq 443'},
      {lesson:'QTM 4 - ACL, NAT, firewall', topic:'Extended ACL placement', clue:'chặn VLAN sinh viên truy cập server quản trị nhưng vẫn cho Internet', correct:'Đặt extended ACL gần nguồn, trên SVI/interface VLAN sinh viên chiều inbound', wrongs:['Đặt sau permit ip any any để tránh lỗi','Đặt trên cổng console router','Đặt gần đích Internet chiều outbound','Không cần xét chiều vào/ra'], config:'Student VLAN -> Management Server deny; Student VLAN -> Internet permit.'},
      {lesson:'QTM 4 - ACL, NAT, firewall', topic:'NAT overload', clue:'nhiều host private dùng chung một IP public ra Internet', correct:'PAT/NAT overload ánh xạ nhiều kết nối inside ra IP interface outside bằng port', wrongs:['Static NAT một-một cho từng host là bắt buộc','NAT overload dùng để chia VLAN trunk','NAT overload thay thế default gateway nội bộ','NAT overload tự mở port inbound vào server'], config:'ip nat inside source list 1 interface Gi0/1 overload'},
      {lesson:'QTM 4 - ACL, NAT, firewall', topic:'NAT exemption VPN', clue:'traffic site-to-site VPN bị NAT làm sai địa chỉ nguồn', correct:'Loại traffic giữa các subnet VPN khỏi NAT Internet bằng no-NAT/NAT exemption', wrongs:['NAT tất cả traffic nội bộ để dễ debug','Chuyển VPN sang FTP passive mode','Tắt route ngược để tránh loop','Đổi STP root bridge'], config:'LAN A 192.168.10.0/24 <-> LAN B 192.168.20.0/24 qua VPN; Internet NAT ở edge.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'OpenVPN route push', clue:'client VPN connected nhưng không tới được LAN server', correct:'Kiểm tra push route, IP forwarding, FORWARD firewall và route ngược hoặc NAT phù hợp', wrongs:['Chỉ đổi port SSH của VPN server','Tắt DNS là vào LAN được','Đổi native VLAN trên switch access','Scale thêm container OpenVPN'], config:'OpenVPN 10.8.0.0/24; LAN server 192.168.30.0/24; default FORWARD DROP.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'SMB/NFS permission', clue:'mount hoặc truy cập share bị permission denied', correct:'Kiểm tra export/share rule, user/group, filesystem permission, client IP và firewall dịch vụ', wrongs:['Đổi OSPF area trên router biên','Mở public SMB cho toàn Internet','Chỉ xóa DNS cache là đủ','Tắt toàn bộ logging'], config:'/data/project chia sẻ cho group qtm; client 192.168.30.50.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'FTP passive mode', clue:'FTP login được nhưng list/download lỗi sau NAT/firewall', correct:'Kiểm tra passive mode, dải passive port và rule firewall/NAT tương ứng', wrongs:['Đổi Service Kubernetes sang ClusterIP','Tăng STP priority','Tắt gateway mặc định của server','Chỉ mở port 445 SMB'], config:'FTP server sau firewall; control port 21 mở, passive ports chưa mở.'},
      {lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'Zabbix trigger', clue:'service chết nhưng không có cảnh báo', correct:'Kiểm tra item key, trigger expression, agent connectivity, action notification và ngưỡng thời gian', wrongs:['Đổi VLAN native là có cảnh báo','Chỉ đổi Docker image sang latest','Xóa toàn bộ history Zabbix','Tắt agent để tránh nhiễu'], config:'zabbix-agent active; item service.info[nginx] không đổi trạng thái.'},
      {lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Docker port mapping', clue:'container chạy nhưng host không truy cập được web', correct:'Kiểm tra mapping HOST:CONTAINER, service listen trong container và firewall trên host', wrongs:['Container chạy là chắc chắn port đã public','Dùng localhost trong container để truy cập host web','Đổi OSPF router-id','Tạo thêm VLAN trunk'], config:'ports:\n  - "8080:80"'},
      {lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Docker volume', clue:'container mất dữ liệu sau khi recreate', correct:'Dữ liệu stateful cần volume hoặc bind mount thay vì chỉ lưu trong filesystem container', wrongs:['Dùng tag latest sẽ giữ dữ liệu vĩnh viễn','Expose port 80 để lưu database','Tăng replicas luôn bảo toàn dữ liệu local','Xóa volume trước khi recreate'], config:'mysql container không khai báo volumes.'},
      {lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Kubernetes Service selector', clue:'Service có endpoints rỗng dù Pod đang chạy', correct:'Selector của Service không khớp label Pod hoặc Pod chưa Ready', wrongs:['ClusterIP bị private nên endpoints luôn rỗng','Ingress TLS secret thiếu sẽ xóa endpoint','Tăng NAT overload trên router','Đổi DNS MX record'], config:'Service selector app=api; Pod label app=web.'},
      {lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Ingress 404', clue:'Pod chạy nhưng truy cập qua Ingress bị 404', correct:'Kiểm tra host/path rule, Ingress Controller, serviceName/servicePort và backend endpoint', wrongs:['Đổi STP root bridge','Mở SMB 445 ra Internet','Tắt readinessProbe luôn đúng','Xóa default route node'], config:'Ingress host api.example.com path /api -> api-svc:80.'},
      {lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Security group', clue:'VM ra Internet được nhưng không SSH vào được', correct:'Kiểm tra inbound security group/NACL, public IP, route table và sshd trên VM', wrongs:['Kiểm tra VLAN allowed list trong Kubernetes','Đổi Docker bridge subnet là đủ','Tạo DNS CNAME cho SSH','Tắt mọi firewall nội bộ'], config:'Outbound OK; inbound TCP 22 chưa có rule từ IP quản trị.'},
      {lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Kubernetes Secret', clue:'secret bị commit lên Git', correct:'Rotate secret, xóa khỏi lịch sử nếu cần và chuyển sang secret manager/quy trình không commit bí mật', wrongs:['Đổi tên file secret là đủ an toàn','Tăng replica để secret tự đổi','Tắt RBAC toàn cluster','Public repo để secret dễ đồng bộ'], config:'db-password.yaml đã push lên repository.'},
      {lesson:'QTM 7 - Automation & vận hành', topic:'Ansible idempotent', clue:'chạy playbook nhiều lần không nên làm thay đổi nếu trạng thái đã đúng', correct:'Idempotent nghĩa là lệnh/playbook đưa hệ thống về trạng thái mong muốn và chạy lại không gây thay đổi thừa', wrongs:['Idempotent là chạy lệnh random để tránh trùng','Idempotent bắt buộc tắt kiểm tra diff','Idempotent chỉ dùng cho Wi-Fi handshake','Idempotent nghĩa là không cần backup'], config:'Playbook cấu hình Nginx, firewall và user quản trị.'},
      {lesson:'QTM 7 - Automation & vận hành', topic:'Backup cấu hình', clue:'có file backup nhưng restore thất bại khi sự cố', correct:'Cần kiểm thử restore, lưu version/diff, bảo vệ secret và ghi runbook rollback rõ ràng', wrongs:['Chỉ backup một lần lúc cài máy là đủ','Backup vào cùng máy không cần kiểm tra','Xóa log để restore nhanh hơn','Không cần biết phiên bản thiết bị'], config:'backup running-config hằng ngày nhưng chưa từng restore thử.'},
      {lesson:'QTM 7 - Automation & vận hành', topic:'HAProxy health check', clue:'load balancer vẫn gửi traffic tới backend lỗi', correct:'Kiểm tra health check, rise/fall, timeout, backend status và log của HAProxy', wrongs:['Đổi subnet mask client','Tăng DHCP lease time','Tắt kiểm tra sức khỏe để cân bằng nhanh','Chỉ đổi DNS server local'], config:'backend app1 down nhưng vẫn nhận request.'},
      {lesson:'QTM 7 - Automation & vận hành', topic:'Change management', clue:'đổi ACL trước giờ thi lab làm mất truy cập', correct:'Backup cấu hình, review diff, maintenance window, kiểm thử từng luồng và chuẩn bị rollback', wrongs:['Sửa trực tiếp production không cần ghi chú','Xóa toàn bộ ACL rồi mở any-any lâu dài','Không cần test route ngược','Chỉ chụp ảnh màn hình là đủ backup'], config:'Cần chặn Student VLAN vào Management VLAN nhưng vẫn cho Web DMZ/Internet.'}
    ];
    drills.push(...extraNetworkDrills());
    const isProjectDrill = d => isQtmProjectTopic({lesson:d.lesson, topic:d.topic, config:d.config});
    const theoryDrills = drills.filter(d => !isProjectDrill(d));
    const projectDrills = drills.filter(isProjectDrill);
    const preferredDrills = theoryDrills.length ? theoryDrills : drills;
    const projectStart = Math.max(preferredDrills.length, Math.floor(targetCount * 0.8));
    const forms = [
      (d) => `Đề cũ cho dữ kiện: ${d.clue}. Kết luận nào đúng nhất?`,
      (d) => `Khi đọc output/cấu hình liên quan ${d.topic}, dấu hiệu "${d.clue}" gợi ý phương án nào?`,
      (d) => `Câu trắc nghiệm hỏi trọng tâm ${d.topic}. Với dữ kiện "${d.clue}", chọn đáp án nào?`,
      (d) => `Nếu đề yêu cầu phân tích nhanh và không đoán mò, dữ kiện "${d.clue}" nên xử lý theo hướng nào?`,
      (d) => `Trong dạng câu lý thuyết nhanh, dấu hiệu "${d.clue}" thường kiểm tra kiến thức nào?`,
      (d) => `Một đáp án sai thường nhầm tầng hoặc nhầm giao thức. Với tình huống "${d.clue}", đáp án đúng là gì?`
    ];
    const labs = [
      'bảng định tuyến Cisco show ip route',
      'output show ip ospf neighbor trên hai router',
      'cấu hình RIP/OSPF với network statement và wildcard mask',
      'bài chia subnet/VLSM cho nhiều VLAN',
      'switch access cấu hình VLAN và trunk 802.1Q',
      'output show interfaces trunk và allowed VLAN',
      'STP root bridge, PortFast và BPDU Guard',
      'router-on-a-stick với subinterface dot1Q',
      'ACL standard/extended đặt inbound hoặc outbound',
      'NAT overload với default route ra Internet',
      'DHCP relay, ip helper-address và DHCP scope',
      'DNS nội bộ với bản ghi A/CNAME',
      'Linux systemctl, ss -tulpn và ip route',
      'Active Directory domain, forest và Additional Domain Controller',
      'kiểm tra ping/traceroute khi khác subnet',
      'PC sai default gateway hoặc subnet mask',
      'show access-lists và implicit deny cuối ACL',
      'route static, connected route và administrative distance'
    ];
    let index = 0;
    while(qs.length < targetCount && index < targetCount * 5){
      const activeDrills = index < projectStart ? preferredDrills : preferredDrills.concat(projectDrills);
      const d = activeDrills[index % activeDrills.length];
      const form = forms[Math.floor(index / activeDrills.length) % forms.length];
      const lab = labs[Math.floor(index / (activeDrills.length * forms.length)) % labs.length];
      const {options, answer} = shuffleOptions(d.correct, d.wrongs);
      const wrongHint = d.wrongs.slice(0,2).join('; ');
      qs.push({
        id:`QTM-MEGA-${String(index + 1).padStart(4,'0')}`,
        type:'mcq',
        lesson:d.lesson,
        topic:d.topic,
        difficulty:index % 4 === 0 ? 3 : 2,
        config:index % 3 === 0 ? `${d.config}\nBối cảnh: ${lab}.` : undefined,
        question:`${form(d)} Bối cảnh: ${lab}.`,
        options,
        answer,
        explanation:`${d.correct}. Dữ kiện "${d.clue}" trỏ trực tiếp tới ${d.topic}; các lựa chọn như "${wrongHint}" sai vì lệch nguyên nhân chính hoặc nhầm sang tầng/giao thức khác.`
      });
      index++;
    }
  }

  function initFilters(){
    const lessons = [...new Set(baseQuestions().map(q=>q.lesson))];
    const box = $('lessonFilters');
    box.innerHTML = lessons.map(l => `<label><input type="checkbox" name="lesson" value="${escapeHtml(l)}" checked /> ${escapeHtml(l)}</label>`).join('');
    $('bankCount').textContent = baseQuestions().length + dynamicQuestions('count-preview', DYNAMIC_BANK_SIZE).length;
  }

  function getSelected(name){
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(x=>x.value);
  }

  function getSubject(){
    return $('subject')?.value || 'atmm';
  }

  function getCompletedExams(){
    try{
      const saved = JSON.parse(localStorage.getItem(COMPLETED_EXAMS_KEY) || '{}');
      const values = Array.isArray(saved[getSubject()]) ? saved[getSubject()] : [];
      return new Set(values.map(Number).filter(n => n >= 1 && n <= EXAM_CATALOG_SIZE));
    } catch(error){
      return new Set();
    }
  }

  function markCurrentExamCompleted(){
    if(currentExamSets.length !== 1) return;
    const examNo = Math.max(1, Math.min(EXAM_CATALOG_SIZE, parseInt($('examNumber')?.value, 10) || 1));
    try{
      const saved = JSON.parse(localStorage.getItem(COMPLETED_EXAMS_KEY) || '{}');
      const completed = new Set(Array.isArray(saved[getSubject()]) ? saved[getSubject()].map(Number) : []);
      completed.add(examNo);
      saved[getSubject()] = [...completed].sort((a,b) => a - b);
      localStorage.setItem(COMPLETED_EXAMS_KEY, JSON.stringify(saved));
    } catch(error){
      // The exam still works when browser storage is disabled.
    }
    renderExamPicker();
  }

  function renderExamPicker(){
    const picker = $('examPicker');
    if(!picker) return;
    const current = Math.max(1, Math.min(EXAM_CATALOG_SIZE, parseInt($('examNumber')?.value, 10) || 1));
    const completed = getCompletedExams();
    picker.innerHTML = Array.from({length:EXAM_CATALOG_SIZE}, (_, index) => {
      const examNo = index + 1;
      const isCompleted = completed.has(examNo);
      const classes = ['exam-pick', isCompleted ? 'completed' : 'new', examNo === current ? 'active' : ''].filter(Boolean).join(' ');
      return `<button type="button" class="${classes}" data-exam-number="${examNo}" aria-pressed="${examNo === current}">
        <strong>Đề ${String(examNo).padStart(2, '0')}</strong>
        <small>${isCompleted ? 'Đã làm' : 'Mới'}</small>
      </button>`;
    }).join('');
    if($('examPickerSummary')){
      $('examPickerSummary').textContent = `${EXAM_CATALOG_SIZE} đề · ${completed.size} đề đã làm · ${EXAM_CATALOG_SIZE - completed.size} đề mới`;
    }
  }

  function selectExamNumber(examNo){
    const normalized = Math.max(1, Math.min(EXAM_CATALOG_SIZE, Number(examNo) || 1));
    if($('examNumber')) $('examNumber').value = normalized;
    renderExamPicker();
    generateExam();
  }

  function selectNextNewExam(){
    const completed = getCompletedExams();
    const current = Math.max(1, Math.min(EXAM_CATALOG_SIZE, parseInt($('examNumber')?.value, 10) || 1));
    for(let offset = 1; offset <= EXAM_CATALOG_SIZE; offset++){
      const candidate = ((current - 1 + offset) % EXAM_CATALOG_SIZE) + 1;
      if(!completed.has(candidate)){
        selectExamNumber(candidate);
        return;
      }
    }
    selectExamNumber((current % EXAM_CATALOG_SIZE) + 1);
  }

  function baseQuestions(){
    if(getSubject() === 'qtm' && typeof NETWORK_QUESTION_BANK !== 'undefined'){
      return NETWORK_QUESTION_BANK;
    }
    return QUESTION_BANK.concat(SUPPLEMENTAL_QUESTIONS);
  }

  function syncSeedFromExamNumber(){
    const input = $('examNumber');
    const examNo = Math.max(1, Math.min(EXAM_CATALOG_SIZE, parseInt(input?.value,10) || 1));
    if(input) input.value = examNo;
    const seed = `DE-${examNo}`;
    if($('seed')) $('seed').value = seed;
    renderExamPicker();
    return seed;
  }

  function generateExam(){
    stopTimer();
    answersVisible = false;
    examSubmitted = false;
    userAnswers = {};
    document.body.classList.remove('exam-submitted');
    $('examResult')?.classList.add('hidden');
    $('toggleAnswersBtn').textContent = 'Hiện đáp án';
    const mode = $('mode').value;
    const subject = getSubject();
    const batchMode = mode === 'qtm-batch';
    const examMode = !batchMode && $('answerMode')?.value === 'exam';
    let count = parseInt($('count').value,10) || 40;
    if(mode==='docx') count = 40;
    if(batchMode) count = 28;
    if(mode==='quick') count = Math.min(count,20);
    $('count').value = count;

    const seed = syncSeedFromExamNumber();
    const variantCount = batchMode ? EXAM_CATALOG_SIZE : (examMode ? 1 : Math.max(1, Math.min(EXAM_CATALOG_SIZE, parseInt($('variantCount')?.value,10) || 1)));
    if($('variantCount')) $('variantCount').value = variantCount;
    const minDiff = parseInt($('difficulty').value,10);
    const lessons = getSelected('lesson');
    let types = getSelected('qtype');
    const previousIds = new Set(lastExamIds);
    const batchUsedIds = new Set();

    if(mode==='docx') types = ['mcq'];
    if(mode==='hard') types = types.filter(t => t !== 'tf' && t !== 'fill');
    if(types.length===0) types=['mcq'];

    let pool = baseQuestions().filter(q => lessons.includes(q.lesson) && q.difficulty >= minDiff && types.includes(q.type));
    pool = pool.concat(dynamicQuestions(seed, DYNAMIC_BANK_SIZE).filter(q => lessons.includes(q.lesson) && q.difficulty >= minDiff && types.includes(q.type)));
    if(mode==='docx') pool = pool.filter(q=>q.type==='mcq');
    if(mode==='hard') pool = pool.filter(q=>q.difficulty>=3 || q.type==='calc');

    currentExamSets = [];
    for(let v=0; v<variantCount; v++){
      const variantSeed = variantCount === 1 ? seed : `${seed}-DE${v+1}`;
      const rng = rngFromSeed(variantSeed+'-'+mode+'-'+count);
      const catalogExamNo = batchMode ? v + 1 : Math.max(1, Math.min(EXAM_CATALOG_SIZE, parseInt($('examNumber')?.value,10) || 1));
      let shuffled = shuffle(pool, rng);
      if(subject === 'qtm') shuffled = prioritizeQtmCatalogSlot(shuffled, catalogExamNo, rng);
      if(variantCount > 1) shuffled = avoidRecentRepeats(shuffled, previousIds, count);
      if(subject === 'qtm' && (mode === 'mixed' || batchMode)) shuffled = balanceQtmSelection(shuffled, count, rng);
      if(shuffled.length < count){
        const fallback = shuffle(baseQuestions().concat(dynamicQuestions(variantSeed+'fallback',DYNAMIC_BANK_SIZE)), rng)
          .filter(q => (mode==='docx'? q.type==='mcq': true) && lessons.includes(q.lesson) && q.difficulty >= minDiff && types.includes(q.type));
        const seen = new Set(shuffled.map(q=>q.id));
        for(const q of fallback){ if(!seen.has(q.id)){ shuffled.push(q); seen.add(q.id); } if(shuffled.length>=count) break; }
      }
      currentExamSets.push({
        label: variantCount === 1 ? `Đề ${parseInt($('examNumber')?.value,10) || 1}` : `Đề ${v+1}`,
        seed: variantSeed,
        questions: selectExamQuestions(subject, shuffled, pool, count, rng, batchUsedIds, catalogExamNo).map((q,i)=>prepareQuestion(q, i, rng, v))
      });
      currentExamSets[currentExamSets.length - 1].questions.forEach(q => batchUsedIds.add(q.caseId || q.id));
    }
    currentExam = currentExamSets.flatMap(set => set.questions.map(q => ({...q, variantSeed:set.seed, variantLabel:set.label})));
    lastExamIds = currentExam.map(q => q.caseId || q.id);
    renderExam();
    renderStats();
    renderQuestionNavigator();
    updateAnswerModeUI();
    if(examMode) startTimer();
    document.querySelector('.content')?.scrollIntoView({behavior:'smooth', block:'start'});
  }

  function avoidRecentRepeats(shuffled, previousIds, count){
    if(!previousIds.size) return shuffled;
    const fresh = shuffled.filter(q => !previousIds.has(q.caseId || q.id));
    const repeated = shuffled.filter(q => previousIds.has(q.caseId || q.id));
    return fresh.length >= count ? fresh.concat(repeated) : fresh.concat(repeated);
  }

  function normalizeDuplicateText(value){
    return String(value || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .replace(/\b\d+\b/g, '#')
      .trim();
  }

  function qtmIdentity(q){
    return q.caseId || q.id;
  }

  function qtmTopicKey(q){
    return normalizeDuplicateText(`${q.lesson || ''}|${q.topic || ''}`);
  }

  function qtmContentFingerprint(q){
    const question = normalizeDuplicateText(q.question).slice(0, 180);
    const config = normalizeDuplicateText(q.config).slice(0, 160);
    const answer = normalizeDuplicateText(q.answer || q.computedAnswer || '').slice(0, 120);
    return `${q.type}|${qtmTopicKey(q)}|${question}|${config}|${answer}`;
  }

  function tryAddQtmQuestion(q, selected, state, options={}){
    const identity = qtmIdentity(q);
    const fingerprint = qtmContentFingerprint(q);
    const topicKey = qtmTopicKey(q);
    const maxTopic = options.maxTopic ?? 1;
    if(state.ids.has(identity) || state.ids.has(q.id)) return false;
    if(!options.allowFingerprintRepeat && state.fingerprints.has(fingerprint)) return false;
    if(topicKey && !options.allowTopicOverflow && (state.topicCounts.get(topicKey) || 0) >= maxTopic) return false;
    selected.push(q);
    state.ids.add(identity);
    state.ids.add(q.id);
    state.fingerprints.add(fingerprint);
    if(topicKey) state.topicCounts.set(topicKey, (state.topicCounts.get(topicKey) || 0) + 1);
    return true;
  }

  function prioritizeQtmCatalogSlot(questions, examNo, rng){
    const bucket = ((Number(examNo) || 1) - 1 + EXAM_CATALOG_SIZE) % EXAM_CATALOG_SIZE;
    const ordered = questions.map((q, index) => ({
      q,
      index,
      score: stableScore(q.caseId || q.id || index, 'qtm-catalog')
    })).sort((a,b) => a.score - b.score || a.index - b.index);
    const preferredIds = new Set(ordered.filter((item, index) => index % EXAM_CATALOG_SIZE === bucket).map(item => item.q.id));
    const preferred = questions.filter(q => preferredIds.has(q.id));
    const rest = questions.filter(q => !preferredIds.has(q.id));
    return preferred.concat(shuffle(rest, rng));
  }

  function balanceQtmSelection(shuffled, count, rng){
    const medium = shuffled.filter(q => q.difficulty <= 2);
    const hard = shuffled.filter(q => q.difficulty >= 3);
    const picked = [];
    const seen = new Set();
    const take = (list) => {
      while(list.length){
        const q = list.shift();
        if(seen.has(q.id)) continue;
        picked.push(q);
        seen.add(q.id);
        return true;
      }
      return false;
    };
    while(picked.length < count && (medium.length || hard.length)){
      take(medium);
      if(picked.length >= count) break;
      take(medium);
      if(picked.length >= count) break;
      take(hard);
    }
    for(const q of shuffled){
      if(picked.length >= count) break;
      if(seen.has(q.id)) continue;
      picked.push(q);
      seen.add(q.id);
    }
    return picked.concat(shuffled.filter(q => !seen.has(q.id)));
  }

  function expandGroupedSelection(shuffled, pool, count, rng){
    const byCase = {};
    for(const q of pool){
      if(!q.caseId) continue;
      if(!byCase[q.caseId]) byCase[q.caseId] = [];
      byCase[q.caseId].push(q);
    }
    const selected = [];
    const seen = new Set();
    for(const q of shuffled){
      if(seen.has(q.id)) continue;
      const block = q.caseId ? shuffle(byCase[q.caseId] || [q], rng) : [q];
      for(const item of block){
        if(seen.has(item.id)) continue;
        selected.push(item);
        seen.add(item.id);
        if(selected.length >= count) return selected;
      }
    }
    return selected;
  }

  function selectExamQuestions(subject, shuffled, pool, count, rng, excludedIds=new Set(), catalogExamNo=1){
    if(subject !== 'qtm') return orderExamQuestions(expandGroupedSelection(shuffled, pool, count, rng));
    return composeNetworkAdminExam(shuffled, pool, count, rng, excludedIds, catalogExamNo);
  }

  function composeNetworkAdminExam(shuffled, pool, count, rng, excludedIds=new Set(), catalogExamNo=1){
    const essayTarget = count >= 24 ? 3 : (count >= 12 ? 2 : 1);
    const projectEssayTarget = essayTarget > 0 ? 1 : 0;
    const regularEssayTarget = Math.max(0, essayTarget - projectEssayTarget);
    const objectiveTarget = Math.max(0, count - essayTarget);
    const seen = new Set();
    const isExcluded = q => excludedIds.has(q.caseId || q.id);
    let filteredShuffled = shuffled.filter(q => !isExcluded(q));
    let filteredPool = pool.filter(q => !isExcluded(q));
    if(filteredShuffled.length < count) filteredShuffled = shuffled;
    if(filteredPool.length < count) filteredPool = pool;
    const objectiveState = {ids:new Set(), fingerprints:new Set(), topicCounts:new Map()};
    const essayState = {ids:new Set(), fingerprints:new Set(), topicCounts:new Map()};
    const objectivePool = prioritizeQtmSlideTheory(
      filteredShuffled.filter(q => q.type === 'mcq' || q.type === 'tf' || q.type === 'match' || q.type === 'fill'),
      objectiveTarget,
      rng
    );
    const selected = [];
    for(const q of objectivePool){
      if(selected.length >= objectiveTarget) break;
      if(!tryAddQtmQuestion(q, selected, objectiveState, {maxTopic:3})) continue;
      seen.add(qtmIdentity(q));
    }
    if(selected.length < objectiveTarget){
      for(const q of prioritizeQtmOldExamObjectives(filteredPool.filter(q => q.type !== 'short' && q.type !== 'calc'), objectiveTarget, catalogExamNo, rng)){
        if(selected.length >= objectiveTarget) break;
        if(!tryAddQtmQuestion(q, selected, objectiveState, {maxTopic:4})) continue;
        seen.add(qtmIdentity(q));
      }
    }
    if(selected.length < objectiveTarget){
      for(const q of prioritizeQtmOldExamObjectives(pool.filter(q => q.type !== 'short' && q.type !== 'calc'), objectiveTarget, catalogExamNo, rng)){
        if(selected.length >= objectiveTarget) break;
        if(!tryAddQtmQuestion(q, selected, objectiveState, {maxTopic:5})) continue;
        seen.add(qtmIdentity(q));
      }
    }
    if(selected.length < objectiveTarget){
      for(const q of prioritizeQtmCatalogSlot(pool.filter(q => q.type !== 'short' && q.type !== 'calc'), catalogExamNo, rng)){
        if(selected.length >= objectiveTarget) break;
        if(!tryAddQtmQuestion(q, selected, objectiveState, {allowFingerprintRepeat:true, allowTopicOverflow:true})) continue;
        seen.add(qtmIdentity(q));
      }
    }

    const essayPool = prioritizeQtmCatalogSlot(filteredPool.filter(q => q.type === 'short' && !isQtmProjectEssay(q)), catalogExamNo, rng).sort((a,b) => {
      const aFinal = /ESSAY-(FINAL|END2END|OUTPUT)/.test(String(a.id || '')) ? 0 : 1;
      const bFinal = /ESSAY-(FINAL|END2END|OUTPUT)/.test(String(b.id || '')) ? 0 : 1;
      const aMedia = a.image ? 0 : 1;
      const bMedia = b.image ? 0 : 1;
      return aFinal - bFinal || essaySlideScore(a) - essaySlideScore(b) || aMedia - bMedia;
    });
    const essays = [];
    for(const q of essayPool){
      if(essays.length >= regularEssayTarget) break;
      if(seen.has(qtmIdentity(q))) continue;
      if(!tryAddQtmQuestion(q, essays, essayState, {maxTopic:1})) continue;
      seen.add(qtmIdentity(q));
    }
    if(essays.length < regularEssayTarget){
      const fallbackEssays = prioritizeQtmCatalogSlot(pool.filter(q => q.type === 'short' && !isQtmProjectEssay(q)), catalogExamNo, rng).sort((a,b) => {
        const aFinal = /ESSAY-(FINAL|END2END|OUTPUT)/.test(String(a.id || '')) ? 0 : 1;
        const bFinal = /ESSAY-(FINAL|END2END|OUTPUT)/.test(String(b.id || '')) ? 0 : 1;
        const aMedia = a.image ? 0 : 1;
        const bMedia = b.image ? 0 : 1;
        return aFinal - bFinal || essaySlideScore(a) - essaySlideScore(b) || aMedia - bMedia;
      });
      for(const q of fallbackEssays){
        if(essays.length >= regularEssayTarget) break;
        if(seen.has(qtmIdentity(q))) continue;
        if(!tryAddQtmQuestion(q, essays, essayState, {maxTopic:2})) continue;
        seen.add(qtmIdentity(q));
      }
    }
    if(essays.length < regularEssayTarget){
      for(const q of prioritizeQtmCatalogSlot(pool.filter(q => q.type === 'short'), catalogExamNo, rng)){
        if(essays.length >= regularEssayTarget) break;
        if(!tryAddQtmQuestion(q, essays, essayState, {allowFingerprintRepeat:true, allowTopicOverflow:true})) continue;
        seen.add(qtmIdentity(q));
      }
    }
    const projectEssays = [];
    if(projectEssayTarget){
      const projectState = {ids:new Set(essayState.ids), fingerprints:new Set(essayState.fingerprints), topicCounts:new Map(essayState.topicCounts)};
      const projectPool = prioritizeQtmProjectEssays(filteredPool, catalogExamNo, rng).concat(prioritizeQtmProjectEssays(pool, catalogExamNo, rng));
      for(const q of projectPool){
        if(projectEssays.length >= projectEssayTarget) break;
        if(seen.has(qtmIdentity(q))) continue;
        if(!tryAddQtmQuestion(q, projectEssays, projectState, {maxTopic:2})) continue;
        seen.add(qtmIdentity(q));
      }
      if(projectEssays.length < projectEssayTarget){
        for(const q of prioritizeQtmCatalogSlot(pool.filter(q => q.type === 'short'), catalogExamNo, rng)){
          if(projectEssays.length >= projectEssayTarget) break;
          if(seen.has(qtmIdentity(q))) continue;
          if(!tryAddQtmQuestion(q, projectEssays, projectState, {allowFingerprintRepeat:true, allowTopicOverflow:true})) continue;
          seen.add(qtmIdentity(q));
        }
      }
    }
    return selected.concat(essays, projectEssays).slice(0, count);
  }

  function prioritizeQtmSlideTheory(questions, targetCount, rng){
    const isObjective = q => q.type === 'mcq' || q.type === 'tf' || q.type === 'match' || q.type === 'fill';
    const sortOldExam = (a,b) => qtmObjectiveExamScore(a) - qtmObjectiveExamScore(b) || stableScore(a.id || a.question, 'old-exam-objective') - stableScore(b.id || b.question, 'old-exam-objective');
    const ordered = questions.filter(isObjective).sort(sortOldExam);
    const grouped = new Map();
    for(const q of ordered){
      const group = qtmKnowledgeGroup(q);
      if(!grouped.has(group)) grouped.set(group, []);
      grouped.get(group).push(q);
    }
    const selected = [];
    const seen = new Set();
    const projectLimit = Math.max(1, Math.min(4, Math.round(targetCount * 0.16)));
    let projectPicked = 0;
    const addQuestion = (q) => {
      if(!q || seen.has(q.id)) return false;
      const project = isQtmProjectTopic(q);
      if(project && projectPicked >= projectLimit) return false;
      selected.push(q);
      seen.add(q.id);
      if(project) projectPicked++;
      return true;
    };
    const takeFrom = (list, desiredCount) => {
      const balanced = balanceQtmSelection(list, Math.max(desiredCount, targetCount), rng);
      const startCount = selected.length;
      for(const q of balanced){
        if(selected.length - startCount >= desiredCount || selected.length >= targetCount) break;
        addQuestion(q);
      }
    };
    for(const [group, desiredCount] of qtmObjectiveGroupTargets(targetCount)){
      takeFrom(grouped.get(group) || [], desiredCount);
    }
    if(selected.length < targetCount){
      const oldStyle = ordered.filter(isQtmOldExamObjective);
      const regularTheory = ordered.filter(q => !isQtmOldExamObjective(q) && !isQtmProjectTopic(q));
      const project = ordered.filter(isQtmProjectTopic);
      for(const q of oldStyle.concat(regularTheory, project)){
        if(selected.length >= targetCount) break;
        addQuestion(q);
      }
    }
    return selected.concat(ordered.filter(q => !seen.has(q.id)));
  }

  function prioritizeQtmOldExamObjectives(questions, targetCount, catalogExamNo, rng){
    const ordered = prioritizeQtmCatalogSlot(questions, catalogExamNo, rng).sort((a,b) => {
      return qtmObjectiveExamScore(a) - qtmObjectiveExamScore(b) || stableScore(a.id || a.question, `old-exam-${catalogExamNo}`) - stableScore(b.id || b.question, `old-exam-${catalogExamNo}`);
    });
    const oldStyle = ordered.filter(isQtmOldExamObjective);
    const regularTheory = ordered.filter(q => !isQtmOldExamObjective(q) && !isQtmProjectTopic(q));
    const project = ordered.filter(isQtmProjectTopic);
    return oldStyle.concat(regularTheory, project);
  }

  function qtmObjectiveGroupTargets(targetCount){
    const planned = [
      ['Routing/OSPF/RIP', Math.max(2, Math.round(targetCount * 0.20))],
      ['Switching/VLAN/STP', Math.max(2, Math.round(targetCount * 0.16))],
      ['IP/DHCP/DNS', Math.max(2, Math.round(targetCount * 0.16))],
      ['ACL/NAT/Firewall', Math.max(2, Math.round(targetCount * 0.14))],
      ['Linux/AD', Math.max(1, Math.round(targetCount * 0.10))],
      ['VPN/Server/Monitoring', targetCount >= 20 ? 2 : 1],
      ['Cloud/Docker/K8s', targetCount >= 20 ? 1 : 0],
      ['Automation/Ops', targetCount >= 20 ? 1 : 0]
    ].filter(([, count]) => count > 0);
    let total = planned.reduce((sum, [, count]) => sum + count, 0);
    for(let i = planned.length - 1; total > targetCount && i >= 0; i--){
      const trim = Math.min(planned[i][1], total - targetCount);
      planned[i][1] -= trim;
      total -= trim;
    }
    return planned.filter(([, count]) => count > 0);
  }

  function qtmKnowledgeGroup(q){
    const lesson = String(q.lesson || '').toLowerCase();
    const topic = String(q.topic || '').toLowerCase();
    const detail = `${q.question || ''} ${q.config || ''}`.toLowerCase();
    const classify = (text) => {
      if(/acl|access-list|firewall|nat|pat|dnat|snat|dmz|implicit deny|port forward|overload/.test(text)) return 'ACL/NAT/Firewall';
      if(/ospf|rip|bgp|show ip route|routing|static route|default route|administrative distance|metric|neighbor|router-id|wildcard/.test(text)) return 'Routing/OSPF/RIP';
      if(/vlan|trunk|stp|switch|router-on-a-stick|port security|etherchannel|bpdu|native vlan|access port/.test(text)) return 'Switching/VLAN/STP';
      if(/subnet|vlsm|cidr|default gateway|dhcp|dns|ip conflict|ip, subnet|dịch vụ nền|dich vu nen|ipv6|host usable/.test(text)) return 'IP/DHCP/DNS';
      if(/active directory|domain controller|adc|forest|linux command|linux firewall|systemctl|ss -|ss |ip route|windows|kerberos|gpupdate|repadmin/.test(text)) return 'Linux/AD';
      if(/vpn|openvpn|zabbix|monitoring|smb|nfs|ftp|file server|guacamole|tun0|giám sát|giam sat/.test(text)) return 'VPN/Server/Monitoring';
      if(/docker|kubernetes|cloud|ingress|pod|container|service selector|readiness|liveness/.test(text)) return 'Cloud/Docker/K8s';
      if(/automation|backup|rollback|ansible|change management|haproxy|version control/.test(text)) return 'Automation/Ops';
      return null;
    };
    const byTopic = classify(topic);
    if(byTopic) return byTopic;
    const byDetail = classify(detail);
    if(byDetail) return byDetail;
    const byLesson = classify(lesson);
    if(byLesson) return byLesson;
    return 'Other';
  }

  function qtmObjectiveExamScore(q){
    const text = `${q.lesson || ''} ${q.topic || ''} ${q.question || ''} ${q.config || ''}`.toLowerCase();
    if(String(q.id || '').startsWith('QTM-OLD-MCQ')) return -2;
    if(isQtmProjectTopic(q)) return 4;
    if(/show ip route|administrative distance|metric|ospf|rip|static route|bgp|ipv6|subnet|vlsm|wildcard|acl|nat|vlan|trunk|stp|router-on-a-stick|dhcp|dns|linux|systemctl|ss |ip addr|active directory|domain controller|adc/.test(text)) return 0;
    if(isCoreSlideLesson(q.lesson)) return 1;
    return 2;
  }

  function isQtmOldExamObjective(q){
    if(!q || q.type === 'short') return false;
    if(isQtmProjectTopic(q)) return false;
    return isCoreSlideLesson(q.lesson) || /rip|bgp|ipv6|linux|active directory|domain controller|adc|router-on-a-stick|show ip route/i.test(`${q.topic || ''} ${q.question || ''} ${q.config || ''}`);
  }

  function isQtmProjectTopic(q){
    const lesson = String(q.lesson || '').toLowerCase();
    const detail = `${q.topic || ''} ${q.config || ''}`.toLowerCase();
    if(/qtm 6|qtm 7/.test(lesson)) return true;
    if(/docker|kubernetes|cloud|ingress|pod|container|ansible|automation|haproxy|backup|rollback|secret manager|deploy web|đồ án|do an/.test(detail)) return true;
    if(/openvpn|vpn|zabbix|smb|nfs|ftp|guacamole|file server|load balancer|linux firewall|iptables server|monitoring/.test(detail)) return true;
    return false;
  }

  function isQtmProjectEssay(q){
    if(!q || q.type !== 'short') return false;
    const text = `${q.id || ''} ${q.lesson || ''} ${q.topic || ''} ${q.question || ''} ${q.config || ''}`.toLowerCase();
    return /final-05|final-06|final-07|project|đồ án|do an|openvpn|vpn|zabbix|file server|smb|nfs|ftp|docker|kubernetes|cloud|ingress|ansible|automation|haproxy|backup|rollback|deploy web|linux server|giám sát|giam sat/.test(text);
  }

  function qtmProjectEssayRank(q){
    const text = `${q.id || ''} ${q.topic || ''} ${q.question || ''} ${q.config || ''}`.toLowerCase();
    if(/examstyle|pastyear|output|end2end|packet tracer|show ip route|show interfaces trunk|bảng ip|bang ip|default gateway|marker lỗi|marker loi|chia subnet|đọc output|doc output/.test(text)) return 0;
    if(/topology|ospf|vlan|acl|nat|dhcp|dns|route chiều về|route chieu ve/.test(text)) return 1;
    if(/vpn|openvpn|zabbix|file server|linux server/.test(text)) return 2;
    if(/cloud|kubernetes|docker|automation|backup|rollback|haproxy/.test(text)) return 3;
    return 4;
  }

  function prioritizeQtmProjectEssays(pool, catalogExamNo, rng){
    return prioritizeQtmCatalogSlot(pool.filter(q => q.type === 'short' && isQtmProjectEssay(q)), catalogExamNo, rng).sort((a,b) => {
      const rankDiff = qtmProjectEssayRank(a) - qtmProjectEssayRank(b);
      if(rankDiff) return rankDiff;
      const aFinal = /FINAL|PROJECT|PASTYEAR|OUTPUT/.test(String(a.id || '')) ? 0 : 1;
      const bFinal = /FINAL|PROJECT|PASTYEAR|OUTPUT/.test(String(b.id || '')) ? 0 : 1;
      const aMedia = a.image ? 0 : 1;
      const bMedia = b.image ? 0 : 1;
      return aFinal - bFinal || aMedia - bMedia || essaySlideScore(a) - essaySlideScore(b);
    });
  }

  function isCoreSlideLesson(lesson){
    return /^QTM [1-5]\b/.test(String(lesson || ''));
  }

  function essaySlideScore(q){
    const id = String(q.id || '');
    const lesson = String(q.lesson || '');
    if(id.includes('OUTPUT') || id.includes('END2END')) return 0;
    if(/QTM [1-5]\b/.test(lesson)) return 1;
    if(/cloud|kubernetes|docker/i.test(`${lesson} ${q.topic || ''}`)) return 3;
    return 2;
  }

  function orderExamQuestions(questions){
    return questions
      .map((q, index) => ({q, index}))
      .sort((a, b) => {
        const aEssay = a.q.type === 'short' ? 1 : 0;
        const bEssay = b.q.type === 'short' ? 1 : 0;
        return aEssay - bEssay || a.index - b.index;
      })
      .map(item => item.q);
  }

  function prepareQuestion(q, index, rng, variantIndex=0){
    const copy = JSON.parse(JSON.stringify(q));
    copy.examIndex = index + 1;
    copy.uid = `v${variantIndex}-${copy.id}-${index}`;
    if(copy.type==='mcq' || (copy.type==='calc' && copy.options && copy.options.length)){
      const correctValue = copy.options[copy.answer];
      const opts = isNetworkQuestion(copy) ? networkBalancedOptions(copy, correctValue, rng) : shuffle(copy.options, rng).slice(0,5);
      // Ensure correct still included
      if(!opts.includes(correctValue)) opts[Math.floor(rng()*opts.length)] = correctValue;
      copy.options = opts;
      copy.answer = opts.indexOf(correctValue);
    }
    if(copy.type==='match'){
      const left = copy.answer.map(p=>p[0]);
      const right = shuffle(copy.answer.map(p=>p[1]), rng);
      copy.matchLeft = left;
      copy.matchRight = right;
    }
    return copy;
  }

  function isNetworkQuestion(q){
    return String(q.lesson || '').startsWith('QTM ');
  }

  function networkBalancedOptions(q, correctValue, rng){
    const existing = q.options.filter(o => o !== correctValue);
    const generated = networkDistractors(q, correctValue);
    const candidates = uniqueStrings(existing.concat(generated))
      .filter(o => o && o !== correctValue)
      .filter(o => !tooSimilarOption(o, correctValue));
    const selected = [];
    const targetLen = String(correctValue).length;
    const shuffled = shuffle(candidates, rng).sort((a,b) => Math.abs(a.length - targetLen) - Math.abs(b.length - targetLen));
    for(const item of shuffled){
      if(selected.length >= 4) break;
      if(selected.some(prev => tooSimilarOption(prev, item))) continue;
      selected.push(item);
    }
    while(selected.length < 4){
      selected.push(genericNetworkDistractor(q, selected.length));
    }
    return shuffle([correctValue].concat(selected.slice(0,4)), rng);
  }

  function uniqueStrings(items){
    const seen = new Set();
    const out = [];
    for(const item of items){
      const text = String(item || '').trim();
      const key = text.toLowerCase();
      if(!text || seen.has(key)) continue;
      seen.add(key);
      out.push(text);
    }
    return out;
  }

  function tooSimilarOption(a,b){
    const x = String(a).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
    const y = String(b).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
    if(!x || !y) return false;
    if(x === y) return true;
    const short = x.length < y.length ? x : y;
    const long = x.length < y.length ? y : x;
    return short.length > 16 && long.includes(short);
  }

  function networkDistractors(q, correctValue){
    const text = `${q.lesson || ''} ${q.topic || ''} ${q.question || ''} ${q.config || ''}`.toLowerCase();
    const d = [];
    const add = (...items) => d.push(...items);
    if(/vlan|trunk|stp|etherchannel|switch/.test(text)){
      add(
        'Kiểm tra VLAN/trunk là cần thiết, nhưng kết luận này bỏ qua gateway layer 3 hoặc ACL nên chưa đủ đúng',
        'Có thể đúng nếu lỗi chỉ nằm ở access port, nhưng không giải thích được toàn bộ luồng end-to-end',
        'Tập trung vào STP/root bridge nghe hợp lý, nhưng không phải nguyên nhân trực tiếp trong dữ kiện đã cho',
        'Đổi native VLAN có thể xử lý một số lỗi trunk, nhưng không phải bước đầu tiên nếu đề hỏi định tuyến liên VLAN'
      );
    }
    if(/ospf|route|routing|default route|định tuyến|router/.test(text)){
      add(
        'Kiểm tra route là đúng hướng, nhưng phương án này thiếu điều kiện route ngược hoặc adjacency nên chưa chính xác nhất',
        'OSPF area 0 là quan trọng, nhưng không phải mọi lỗi routing đều do thiếu area 0',
        'Default route giúp ra Internet, nhưng không thay thế route nội bộ hoặc route tới mạng chi nhánh',
        'Ping trực tiếp chỉ chứng minh reachability cơ bản, chưa đủ kết luận bảng định tuyến đã đúng'
      );
    }
    if(/acl|firewall|nat|dmz|iptables|security group/.test(text)){
      add(
        'Mở rule rộng có thể làm thông mạng, nhưng sai nguyên tắc least privilege và không phải đáp án an toàn nhất',
        'NAT xử lý luồng ra Internet, nhưng không nên áp dụng bừa cho traffic nội bộ hoặc VPN',
        'ACL đúng chiều là quan trọng, nhưng phương án này bỏ qua thứ tự rule và implicit deny',
        'Chỉ kiểm tra service đích là chưa đủ nếu firewall hoặc route hai chiều đang chặn'
      );
    }
    if(/docker|container|compose|kubernetes|kubectl|pod|service|ingress|cloud/.test(text)){
      add(
        'Pod/container chạy không đồng nghĩa ứng dụng đã sẵn sàng nhận traffic qua Service hoặc Ingress',
        'Mở port public nghe có vẻ xử lý nhanh, nhưng bỏ qua selector, targetPort hoặc security group',
        'Scale thêm replica có thể tăng tải, nhưng không sửa lỗi cấu hình route/service/secret/probe',
        'Dùng image mới hơn không phải đáp án trọng tâm nếu dữ kiện đang nói về network hoặc endpoint'
      );
    }
    if(/vpn|openvpn|zabbix|smb|nfs|ftp|linux|systemd|ssh|ad ds|guacamole/.test(text)){
      add(
        'Service up là điều kiện cần, nhưng chưa đủ nếu route, firewall hoặc phân quyền vẫn sai',
        'Mở port toàn Internet có thể làm truy cập được, nhưng là cách xử lý không an toàn trong quản trị mạng',
        'Đổi DNS có thể cần khi truy cập bằng tên, nhưng không giải quyết lỗi route/firewall theo IP',
        'Chỉ xem log ứng dụng là chưa đủ nếu gói tin chưa tới được server qua tunnel hoặc firewall'
      );
    }
    if(!d.length){
      add(
        'Nhận định này đúng một phần nhưng thiếu điều kiện quan trọng trong dữ kiện đề bài',
        'Cách này có thể dùng khi troubleshoot, nhưng chưa phải nguyên nhân hoặc giải pháp sát nhất',
        'Phương án này xử lý ở tầng khác nên không trả lời đúng trọng tâm câu hỏi',
        'Kết luận này quá rộng, dễ đúng trong vài trường hợp nhưng không đúng nhất với tình huống đã cho'
      );
    }
    return d.filter(item => item !== correctValue);
  }

  function genericNetworkDistractor(q, index){
    const items = [
      'Đúng trong một số bài lab, nhưng chưa đủ điều kiện để kết luận là đáp án chính của câu này',
      'Nghe hợp lý về mặt vận hành, nhưng xử lý sai tầng giao thức so với dữ kiện đề bài',
      'Có thể là bước kiểm tra phụ, nhưng không giải thích được nguyên nhân trọng tâm',
      'Phương án này quá rộng và bỏ qua chi tiết cấu hình đang được hỏi'
    ];
    return items[index % items.length];
  }

  function renderExam(){
    const mode = $('mode').value;
    const subject = getSubject();
    const config = subjectConfig[subject] || subjectConfig.atmm;
    const mcqCount = currentExam.filter(q => q.type==='mcq' || (q.type==='calc' && q.options && q.options.length)).length;
    const perExamCount = currentExamSets[0]?.questions.length || currentExam.length;
    const examMode = $('answerMode')?.value === 'exam';
    const duration = getExamDurationMinutes();
    const examLabel = currentExamSets.length > 1 ? `${currentExamSets.length} đề` : (currentExamSets[0]?.label || `Đề ${$('examNumber')?.value || 1}`);
    $('examMeta').innerHTML = `
      <div>
        <h2>${mode==='docx' && subject==='atmm'?'ĐỀ THI MÔ PHỎNG - 40 CÂU':config.examTitle}</h2>
        <p>${escapeHtml(examLabel)} · ${examMode ? `Thời gian thi: ${duration} phút` : `Thời gian gợi ý: ${mode==='docx'?'75 phút': Math.max(15, Math.round(perExamCount*1.8))+' phút'}`} · Tổng câu: ${currentExam.length}</p>
      </div>
      <span class="meta-chip">${escapeHtml(config.label)} · ${mcqCount} câu trắc nghiệm</span>
    `;

    $('answerGrid').innerHTML = mode==='docx' && subject==='atmm' ? buildBlankAnswerGrid(40) : '';
    const out = $('examOutput');
    out.innerHTML = '';
    const sets = currentExamSets.length ? currentExamSets : [{label:'', seed, questions:currentExam}];
    for(const set of sets){
      if(sets.length > 1){
        const title = document.createElement('div');
        title.className = 'exam-set-title';
        title.innerHTML = `<h3>${escapeHtml(set.label)}</h3><p>Số câu: ${set.questions.length}</p>`;
        out.appendChild(title);
      }
      for(const q of set.questions){ out.appendChild(renderQuestion(q)); }
    }
  }

  function renderQuestion(q){
    const tpl = $('questionTemplate').content.cloneNode(true);
    tpl.querySelector('.question-card').dataset.qid = q.uid;
    tpl.querySelector('.q-number').textContent = `Câu ${q.examIndex}.`;
    tpl.querySelector('.lesson').textContent = q.lesson;
    tpl.querySelector('.type').textContent = typeLabel[q.type] || q.type;
    tpl.querySelector('.difficulty').textContent = diffLabel[q.difficulty] || 'Khó';
    let questionHtml = '';
    if(q.context){
      questionHtml += `<div class="q-context"><strong>Dữ kiện chung:</strong> ${escapeHtml(q.context)}</div>`;
    }
    if(q.config){
      questionHtml += `<pre class="q-config">${escapeHtml(q.config)}</pre>`;
    }
    if(q.image){
      questionHtml += `<figure class="q-figure"><img src="${escapeAttr(q.image.src)}" alt="${escapeAttr(q.image.alt || 'Hình minh họa câu hỏi')}" />${q.image.caption ? `<figcaption>${escapeHtml(q.image.caption)}</figcaption>` : ''}</figure>`;
    }
    questionHtml += `<div>${escapeHtml(q.question).replace(/________/g, '<span class="fill-line"></span>').replace(/\n/g, '<br>')}</div>`;
    tpl.querySelector('.q-text').innerHTML = questionHtml;
    const body = tpl.querySelector('.q-body');
    if(q.type==='mcq' || (q.type==='calc' && q.options && q.options.length)){
      body.innerHTML = `<ul class="options option-buttons">${q.options.map((o,i)=>`<li><button class="option-btn" type="button" data-qid="${escapeAttr(q.uid)}" data-choice="${i}"><span class="letter">${letters[i]}.</span>${escapeHtml(o)}</button></li>`).join('')}</ul>`;
    } else if(q.type==='tf'){
      body.innerHTML = `<ul class="options option-buttons"><li><button class="option-btn" type="button" data-qid="${escapeAttr(q.uid)}" data-choice="true"><span class="letter">A.</span>Đúng</button></li><li><button class="option-btn" type="button" data-qid="${escapeAttr(q.uid)}" data-choice="false"><span class="letter">B.</span>Sai</button></li></ul>`;
    } else if(q.type==='match'){
      body.innerHTML = buildMatchHtml(q);
    } else if(q.type==='short'){
      body.innerHTML = '<div class="short-lines"><p>Trả lời: ............................................................................................................................</p><p>........................................................................................................................................</p></div>';
    } else if(q.type==='fill'){
      body.innerHTML = '<p class="hint">Điền thuật ngữ/cụm từ đúng vào chỗ trống.</p>';
    } else if(q.type==='calc'){
      body.innerHTML = '<div class="short-lines"><p>Bài làm: ............................................................................................................................</p><p>........................................................................................................................................</p></div>';
    }
    const ans = tpl.querySelector('.answer');
    ans.innerHTML = answerHtml(q);
    if(answersVisible) ans.classList.remove('hidden');
    return tpl;
  }

  function answerHtml(q, selectedChoice=null){
    let a = '';
    if(q.type==='mcq' || (q.type==='calc' && q.options && q.options.length)) a = `${letters[q.answer]}. ${escapeHtml(q.options[q.answer])}`;
    else if(q.type==='tf') a = q.answer ? 'Đúng' : 'Sai';
    else if(q.type==='match') a = q.answer.map(p=>`${escapeHtml(p[0])} → ${escapeHtml(p[1])}`).join('; ');
    else a = formatMultilineText(q.answer);
    const wrong = wrongFeedbackHtml(q, selectedChoice);
    return `${wrong}<strong>Đáp án:</strong> ${a}<br><strong>Giải thích:</strong> ${formatMultilineText(richExplanation(q))}`;
  }

  function formatMultilineText(value){
    return escapeHtml(String(value || '')).replace(/\n/g, '<br>');
  }

  function wrongFeedbackHtml(q, selectedChoice){
    if(selectedChoice === null || selectedChoice === undefined) return '';
    if(!isGradable(q) || isCorrect(q, selectedChoice)) return '';
    let chosenText = '';
    if(q.type === 'tf') chosenText = selectedChoice ? 'Đúng' : 'Sai';
    else if(q.options && q.options[selectedChoice] !== undefined) chosenText = `${letters[selectedChoice]}. ${q.options[selectedChoice]}`;
    if(!chosenText) return '';
    return `<div class="wrong-feedback"><strong>Bạn chọn:</strong> ${escapeHtml(chosenText)}<br><strong>Vì sao sai:</strong> ${escapeHtml(explainWrongChoice(q, selectedChoice))}</div>`;
  }

  function explainWrongChoice(q, selectedChoice){
    if(q.optionFeedback && q.optionFeedback[selectedChoice]) return q.optionFeedback[selectedChoice];
    const chosen = choiceText(q, selectedChoice);
    const correct = correctText(q);
    const wrong = wrongChoiceReason(q, chosen, correct);
    const focus = specificReason(q, correct, {forWrong:true});
    return `${wrong} Đáp án đúng là "${correct}" vì ${focus}`;
  }

  function choiceText(q, choice){
    if(q.type === 'tf') return choice ? 'Đúng' : 'Sai';
    return String(q.options?.[choice] || '');
  }

  function correctText(q){
    if(q.type === 'tf') return q.answer ? 'Đúng' : 'Sai';
    if(q.type === 'mcq' || (q.type === 'calc' && q.options && q.options.length)) return String(q.options?.[q.answer] || '');
    if(q.type === 'match') return q.answer.map(p=>`${p[0]} -> ${p[1]}`).join('; ');
    return String(q.answer || q.computedAnswer || '');
  }

  function explainText(value){
    return String(value || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function hasAny(text, keys){
    return keys.some(k => text.includes(k));
  }

  function wrongChoiceReason(q, chosen, correct){
    const selected = explainText(chosen);
    const all = explainText(`${q.lesson || ''} ${q.topic || ''} ${q.question || ''} ${q.config || ''} ${correct || ''}`);
    const symptom = focusLabel(q);
    const rules = [
      {
        keys:['dns','cname','mx','resolver','zone','ten mien'],
        reason:`Phương án này chỉ xử lý phân giải tên. DNS có thể làm sai tên -> IP, nhưng không tự sửa được ${symptom} nếu gốc lỗi là gateway, trunk, route, ACL hoặc firewall.`
      },
      {
        keys:['stp','bpdu','portfast','bridge priority','root bridge'],
        reason:`Phương án này đang đi về chống loop layer 2. STP/BPDU chỉ hợp lý khi có loop, root bridge hoặc err-disabled; nó không giải thích trực tiếp ${symptom} nếu đề đang cho route, ACL, gateway hoặc service.`
      },
      {
        keys:['nat','pat','dnat','snat','masquerade','overload','hairpin'],
        reason:`Phương án này nhảy sang dịch địa chỉ. NAT chỉ đổi IP/port ở biên mạng; nếu dữ kiện đang chỉ ra VLAN/trunk, route nội bộ, ACL hoặc service chưa listen thì bật NAT không chữa đúng nguyên nhân.`
      },
      {
        keys:['ospf','router-id','area','cost','default-information','static route','route'],
        reason:`Phương án này nhìn vào định tuyến, nhưng chưa khớp dấu hiệu chính. Route/OSPF chỉ quyết định đường đi layer 3; nếu lỗi nằm ở access VLAN, trunk allowed VLAN, DNS, service hoặc ACL đặt sai chiều thì sửa route vẫn không hết lỗi.`
      },
      {
        keys:['vlan','trunk','native','switchport','access port','allowed vlan'],
        reason:`Phương án này tập trung layer 2. VLAN/trunk đúng là quan trọng, nhưng nếu dữ kiện cho thấy gói đã qua gateway hoặc ACL hit count tăng thì vấn đề đã lên layer 3/4, không chỉ còn là cấu hình switchport.`
      },
      {
        keys:['acl','firewall','iptables','nftables','security group','permit','deny','any any'],
        reason:`Phương án này liên quan lọc traffic nhưng chưa đủ chặt. Với ACL/firewall phải xét đúng nguồn, đích, port, thứ tự rule và chiều inbound/outbound; mở hoặc chặn quá rộng dễ làm sai policy.`
      },
      {
        keys:['dhcp','ip helper','lease','scope','reservation'],
        reason:`Phương án này chỉ xử lý cấp phát IP. DHCP giúp client nhận IP/mask/gateway/DNS, nhưng không tự sửa được route chiều về, ACL, service server hoặc trunk thiếu VLAN sau khi client đã có địa chỉ.`
      },
      {
        keys:['gateway','subnet','mask','/30','/24','/26','arp'],
        reason:`Phương án này chạm tới địa chỉ IP nhưng chưa giải đúng dấu hiệu. Gateway phải cùng subnet với host; subnet mask quyết định cùng mạng hay khác mạng, còn route/ACL/service vẫn phải kiểm riêng khi đi qua router.`
      },
      {
        keys:['vpn','openvpn','ipsec','tun0','tunnel'],
        reason:`Phương án này mới nói tới trạng thái VPN. VPN connected chỉ chứng minh tunnel lên; traffic vào LAN còn cần push route, IP forwarding, rule FORWARD và route chiều về hoặc NAT exemption.`
      },
      {
        keys:['docker','container','compose','ports','volume'],
        reason:`Phương án này nhìn vào container nhưng chưa chắc đúng luồng truy cập. Container chạy không đồng nghĩa port đã publish, service listen đúng địa chỉ, volume giữ dữ liệu hoặc firewall host cho phép.`
      },
      {
        keys:['kubernetes','kubectl','pod','service','ingress','endpoint','readiness','selector'],
        reason:`Phương án này nhầm giữa tài nguyên Kubernetes đang tồn tại và traffic thật. Pod Running chưa đủ; Service cần selector đúng, endpoint không rỗng, port/targetPort đúng và Pod Ready.`
      },
      {
        keys:['zabbix','monitoring','trigger','alert','backup','rollback','ansible'],
        reason:`Phương án này thiên về vận hành sau sự cố. Monitoring/backup/automation rất cần, nhưng nếu câu hỏi hỏi nguyên nhân mất kết nối thì vẫn phải chứng minh bằng route, firewall, service hoặc cấu hình cụ thể trước.`
      },
      {
        keys:['public','internet','mo port','open','tat firewall','xoa acl','any-any','any any'],
        reason:`Phương án này quá rộng và rủi ro. Trong đề quản trị mạng, mở public hoặc xóa bảo vệ có thể làm thông tạm thời nhưng sai nguyên tắc least privilege và không chứng minh đúng nguyên nhân.`
      },
      {
        keys:['scale','replica','tang','doi hostname','doi password','xoa log'],
        reason:`Phương án này là thao tác phụ hoặc chữa triệu chứng. Nó không bám vào dấu hiệu kỹ thuật của đề nên dễ bỏ sót lỗi thật như route thiếu, ACL sai chiều, selector sai hoặc gateway không cùng subnet.`
      }
    ];
    const matched = rules.find(rule => hasAny(selected, rule.keys));
    if(matched) return matched.reason;
    return `Phương án này có thể đúng ở ngữ cảnh khác, nhưng không giải thích được dấu hiệu "${symptom}" trong dữ kiện. Nó cũng không chỉ ra được lệnh kiểm tra hoặc điều kiện cấu hình then chốt.`;
  }

  function richExplanation(q){
    const base = String(q.explanation || '').trim();
    const correct = correctText(q);
    const extra = specificReason(q, correct);
    const isQtm = String(q.lesson || '').startsWith('QTM');
    const generic = /trọng tâm là|các đáp án sai|câu ôn định nghĩa|đúng kiểu đề|hướng xử lý trọng tâm/i.test(base);
    if(!base) return extra;
    if(isQtm || generic || base.length < 90) return `${base} ${extra}`;
    return base;
  }

  function focusLabel(q){
    const text = explainText(`${q.lesson || ''} ${q.topic || ''} ${q.question || ''} ${q.config || ''}`);
    const labels = [
      {keys:['show ip route','route chieu ve','ospf','default route','static route'], label:'bảng định tuyến/route chiều về'},
      {keys:['trunk','allowed vlan','native vlan','access vlan','switchport'], label:'VLAN hoặc trunk layer 2'},
      {keys:['acl','access-list','firewall','iptables','security group','deny','permit'], label:'rule lọc traffic hoặc chiều áp ACL/firewall'},
      {keys:['nat','pat','dnat','hairpin','overload'], label:'luồng NAT và port mapping'},
      {keys:['dhcp','ip helper','scope','lease'], label:'quá trình cấp IP DHCP'},
      {keys:['dns','nslookup','record','cname','domain'], label:'phân giải tên DNS'},
      {keys:['gateway','subnet','mask','arp'], label:'IP/subnet/default gateway'},
      {keys:['vpn','openvpn','ipsec','tun0'], label:'tunnel VPN, forwarding và route về'},
      {keys:['kubernetes','pod','service','ingress','endpoint','selector'], label:'đường đi Service/Ingress tới Pod'},
      {keys:['docker','container','ports','volume'], label:'port/volume/network của container'},
      {keys:['zabbix','monitoring','backup','rollback','ansible'], label:'quy trình vận hành và giám sát'},
      {keys:['rsa','diffie','hash','mac','signature','tls','kerberos','otp','replay','aes','ecb'], label:'tính chất bảo mật cốt lõi'}
    ];
    return (labels.find(item => hasAny(text, item.keys)) || {label:'dấu hiệu chính của đề'}).label;
  }

  function specificReason(q, correct, options={}){
    const text = explainText(`${q.lesson || ''} ${q.topic || ''} ${q.question || ''} ${q.config || ''} ${correct || ''}`);
    const correctPart = correct ? `Đáp án đúng bám vào "${correct}". ` : '';
    const rules = [
      {
        keys:['show ip route','network not in table','ospf','route chieu ve','default-information','static route'],
        reason:`${correctPart}Ở câu định tuyến, hãy đọc route hiện có và route còn thiếu: ping qua nhiều router cần cả đường đi lẫn đường về. Neighbor FULL chỉ chứng minh hai router nói chuyện được, chưa chứng minh mọi prefix đã được quảng bá hoặc được chọn vào routing table.`
      },
      {
        keys:['gateway','subnet','mask','/26','/27','/30','arp','usable','broadcast'],
        reason:`${correctPart}Host dùng subnet mask để quyết định đích cùng mạng hay khác mạng. Default gateway phải cùng subnet với host; với link router-router chỉ cần /30 hoặc /31, còn VLAN người dùng phải đủ usable host.`
      },
      {
        keys:['trunk','allowed vlan','native vlan','switchport','access vlan','vlan'],
        reason:`${correctPart}VLAN là lỗi layer 2: access port quyết định host thuộc VLAN nào, trunk quyết định VLAN nào được mang qua uplink. Nếu VLAN không nằm trong allowed list hoặc native VLAN lệch, host có IP đúng vẫn có thể không đi tới gateway/DMZ.`
      },
      {
        keys:['acl','access-list','implicit deny','firewall','iptables','security group','permit','deny'],
        reason:`${correctPart}ACL/firewall phải đọc theo thứ tự, đúng chiều và đúng tuple nguồn-đích-port. Một rule deny phía trên hoặc đặt sai interface có thể làm traffic bị chặn dù routing và gateway đều đúng.`
      },
      {
        keys:['nat','pat','dnat','snat','hairpin','overload','port forward'],
        reason:`${correctPart}NAT chỉ nên áp cho luồng cần dịch địa chỉ. Traffic nội bộ/VPN thường cần no-NAT hoặc route thật; DNAT/port-forward còn phải khớp public port, private port, ACL outside-in và route trả lời.`
      },
      {
        keys:['dhcp','ip helper','scope','lease','dora'],
        reason:`${correctPart}DHCP Discover là broadcast nên không tự qua router. Nếu server DHCP ở VLAN khác, gateway VLAN phải relay bằng ip helper-address, server phải có scope đúng subnet và option default-router/DNS đúng.`
      },
      {
        keys:['dns','nslookup','record','cname','split dns','hairpin'],
        reason:`${correctPart}DNS chỉ biến tên thành địa chỉ IP. Nếu ping IP được nhưng tên lỗi thì kiểm DNS; nếu cả IP cũng lỗi thì phải quay lại route, ACL, firewall hoặc service server.`
      },
      {
        keys:['vpn','openvpn','ipsec','tun0','ip_forward','forward drop','route push'],
        reason:`${correctPart}VPN up chưa đủ. Client cần route được push, VPN server phải bật IP forwarding, firewall phải cho FORWARD đúng chiều, và LAN đích phải biết route về subnet VPN hoặc dùng NAT có kiểm soát.`
      },
      {
        keys:['docker','container','ports','volume','bridge subnet'],
        reason:`${correctPart}Với Docker, phải tách ba lớp: container có chạy không, port host:container đã publish chưa, và dữ liệu/network có bị mất hoặc trùng subnet không. Container Running không tự mở port ra ngoài.`
      },
      {
        keys:['kubernetes','kubectl','pod','service','ingress','endpoint','selector','readiness','targetport'],
        reason:`${correctPart}Trong Kubernetes, request đi DNS/LB -> Ingress -> Service -> Endpoint/Pod. Service selector sai hoặc Pod chưa Ready làm endpoint rỗng, dù Deployment/Pod nhìn có vẻ đang chạy.`
      },
      {
        keys:['zabbix','monitoring','trigger','backup','rollback','ansible','idempotent','change management'],
        reason:`${correctPart}Câu vận hành không chỉ hỏi lệnh sửa mà hỏi quy trình: backup cấu hình, kiểm thử, giám sát, trigger ít nhiễu và rollback có chứng cứ giúp tránh sửa tay làm lỗi lan rộng.`
      },
      {
        keys:['diffie','hellman','mitm','certificate','tls'],
        reason:`${correctPart}Điểm mấu chốt là xác thực danh tính. Trao đổi khóa hoặc mã hóa chỉ bảo vệ kênh khi public key/certificate được kiểm chứng; bỏ qua cảnh báo chứng chỉ mở cửa cho MITM.`
      },
      {
        keys:['rsa','phi','public key','private key','signature','mac','hmac','hash','collision'],
        reason:`${correctPart}Cần phân biệt mục tiêu: hash kiểm toàn vẹn không khóa, HMAC/MAC xác thực bên biết secret, chữ ký số dùng private key để hỗ trợ chống chối bỏ, RSA phụ thuộc n=pq và phi(n).`
      },
      {
        keys:['aes','ecb','cbc','otp','replay','nonce','timestamp','kerberos','ticket'],
        reason:`${correctPart}Các câu này thường bẫy điều kiện an toàn: ECB lộ mẫu lặp, OTP hỏng khi dùng lại khóa, replay cần nonce/timestamp, Kerberos dựa trên ticket và thời gian hợp lệ.`
      }
    ];
    const matched = rules.find(rule => hasAny(text, rule.keys));
    if(matched) return matched.reason;
    return `${correctPart}Hãy bám vào dữ kiện cụ thể, xác định đang lỗi ở layer nào, rồi chọn phương án có thể chứng minh bằng lệnh kiểm tra hoặc tính chất lý thuyết tương ứng.`;
  }

  function findQuestion(uid){
    for(const set of currentExamSets){
      const q = set.questions.find(item => item.uid === uid);
      if(q) return q;
    }
    return currentExam.find(q => q.uid === uid);
  }

  function normalizeChoice(value){
    if(value === 'true') return true;
    if(value === 'false') return false;
    return Number(value);
  }

  function isCorrect(q, choice){
    return q.type === 'tf' ? choice === q.answer : Number(choice) === Number(q.answer);
  }

  function selectAnswer(button){
    if(examSubmitted) return;
    const uid = button.dataset.qid;
    const q = findQuestion(uid);
    if(!q) return;
    const choice = normalizeChoice(button.dataset.choice);
    userAnswers[uid] = choice;
    activeQuestionUid = uid;
    const card = button.closest('.question-card');
    card.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected', 'correct', 'incorrect');
    });
    button.classList.add('selected');

    if($('answerMode')?.value === 'practice'){
      revealQuestionResult(q, card);
      const gradableQuestions = currentExam.filter(isGradable);
      if(gradableQuestions.length && gradableQuestions.every(item => Object.prototype.hasOwnProperty.call(userAnswers, item.uid))){
        markCurrentExamCompleted();
      }
    }
    updateQuestionNavigator();
  }

  function revealQuestionResult(q, card){
    const choice = userAnswers[q.uid];
    card.querySelectorAll('.option-btn').forEach(btn => {
      const btnChoice = normalizeChoice(btn.dataset.choice);
      const correct = isCorrect(q, btnChoice);
      btn.classList.toggle('correct', correct);
      btn.classList.toggle('incorrect', btnChoice === choice && !correct);
    });
    const answer = card.querySelector('.answer');
    if(answer){
      answer.innerHTML = answerHtml(q, choice);
      answer.classList.remove('hidden');
    }
  }

  function submitExam(autoSubmitted=false){
    if(examSubmitted) return;
    examSubmitted = true;
    stopTimer();
    document.body.classList.add('exam-submitted');
    let total = 0, correct = 0;
    currentExam.forEach(q => {
      if(!isGradable(q)) return;
      total++;
      const card = document.querySelector(`.question-card[data-qid="${CSS.escape(q.uid)}"]`);
      if(!card) return;
      if(Object.prototype.hasOwnProperty.call(userAnswers, q.uid) && isCorrect(q, userAnswers[q.uid])) correct++;
      revealQuestionResult(q, card);
      card.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
    });
    const score = total ? ((correct / total) * 10).toFixed(2) : '0.00';
    const box = $('examResult');
    if(box){
      box.innerHTML = `<strong>${autoSubmitted ? 'Hết giờ, hệ thống đã tự nộp bài.' : 'Kết quả:'}</strong> ${correct}/${total} câu đúng · Điểm khoảng ${score}/10`;
      box.classList.remove('hidden');
      box.scrollIntoView({behavior:'smooth', block:'center'});
    }
    updateAnswerModeUI();
    updateQuestionNavigator();
    markCurrentExamCompleted();
  }

  function buildMatchHtml(q){
    const leftRows = q.matchLeft.map((l,i)=>`<tr><td>${i+1}. ${escapeHtml(l)}</td><td>${letters[i] || i+1}. ${escapeHtml(q.matchRight[i] || '')}</td></tr>`).join('');
    return `<table class="match-table"><thead><tr><th>Cột A</th><th>Cột B</th></tr></thead><tbody>${leftRows}</tbody></table><p class="hint">Ghi dạng: 1-A, 2-B...</p>`;
  }

  function getExamDurationMinutes(){
    const raw = parseInt($('examDuration')?.value,10);
    if(Number.isFinite(raw) && raw > 0) return Math.max(5, Math.min(180, raw));
    const mode = $('mode')?.value;
    const count = parseInt($('count')?.value,10) || 40;
    return mode === 'docx' ? 75 : Math.max(15, Math.round(count * 1.8));
  }

  function startTimer(){
    stopTimer();
    const minutes = getExamDurationMinutes();
    if($('examDuration')) $('examDuration').value = minutes;
    timerEndsAt = Date.now() + minutes * 60 * 1000;
    tickTimer();
    timerId = setInterval(tickTimer, 1000);
  }

  function stopTimer(){
    if(timerId) clearInterval(timerId);
    timerId = null;
  }

  function tickTimer(){
    const remaining = Math.max(0, timerEndsAt - Date.now());
    const totalSeconds = Math.ceil(remaining / 1000);
    const badge = $('timerBadge');
    if(badge){
      badge.textContent = formatTime(totalSeconds);
      badge.classList.toggle('warning', totalSeconds <= 300);
    }
    if(totalSeconds <= 0 && $('answerMode')?.value === 'exam' && !examSubmitted){
      submitExam(true);
    }
  }

  function formatTime(totalSeconds){
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function renderQuestionNavigator(){
    const grid = $('questionNavGrid');
    if(!grid) return;
    grid.innerHTML = currentExam.map(q => `<button type="button" class="q-nav-btn" data-qid="${escapeAttr(q.uid)}" title="Câu ${q.examIndex}">${q.examIndex}</button>`).join('');
    updateQuestionNavigator();
  }

  function updateQuestionNavigator(){
    const nav = $('examNavigator');
    const examMode = $('answerMode')?.value === 'exam';
    nav?.classList.toggle('hidden', !examMode || !currentExam.length);
    document.querySelectorAll('.q-nav-btn').forEach(btn => {
      const q = findQuestion(btn.dataset.qid);
      const answered = q && Object.prototype.hasOwnProperty.call(userAnswers, q.uid);
      btn.classList.toggle('answered', !!answered && !examSubmitted);
      btn.classList.toggle('current', btn.dataset.qid === activeQuestionUid);
      btn.classList.remove('done-correct', 'done-wrong');
      if(examSubmitted && q && isGradable(q)){
        const ok = answered && isCorrect(q, userAnswers[q.uid]);
        btn.classList.toggle('done-correct', ok);
        btn.classList.toggle('done-wrong', !ok);
      }
    });
  }

  function buildBlankAnswerGrid(n){
    const perBlock = 10, blocks = Math.ceil(n/perBlock);
    let html = '<h3 style="margin:0 0 6px;text-align:center">BẢNG TRẢ LỜI</h3><table><tbody>';
    for(let r=0;r<perBlock;r++){
      html += '<tr>';
      for(let b=0;b<blocks;b++){
        const no = b*perBlock+r+1;
        if(no<=n){
          html += `<th>${no}</th>` + letters.slice(0,5).map(l=>`<td>${l.toLowerCase()}</td>`).join('');
        }
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
  }

  function toggleAnswers(){
    if($('answerMode')?.value === 'exam' && !examSubmitted) return;
    answersVisible = !answersVisible;
    document.querySelectorAll('.answer').forEach(el=>el.classList.toggle('hidden', !answersVisible));
    $('toggleAnswersBtn').textContent = answersVisible ? 'Ẩn đáp án' : 'Hiện đáp án';
  }

  function renderTheory(){
    const cards = getSubject() === 'qtm' && typeof NETWORK_THEORY_CARDS !== 'undefined' ? NETWORK_THEORY_CARDS : THEORY_CARDS;
    $('theoryOutput').innerHTML = cards.map(card => `
      <article class="theory-card">
        <h3>${escapeHtml(card.lesson)} - ${escapeHtml(card.title)}</h3>
        <ul>${card.points.map(p=>`<li>${escapeHtml(p)}</li>`).join('')}</ul>
      </article>`).join('');
  }

  function renderStats(){
    const byLesson = {};
    const all = baseQuestions().concat(dynamicQuestions($('seed').value || 'stats', DYNAMIC_BANK_SIZE));
    for(const q of all){
      if(!byLesson[q.lesson]) byLesson[q.lesson] = {total:0, mcq:0, tf:0, fill:0, short:0, match:0, calc:0, hard:0};
      byLesson[q.lesson].total++;
      byLesson[q.lesson][q.type] = (byLesson[q.lesson][q.type]||0)+1;
      if(q.difficulty>=3) byLesson[q.lesson].hard++;
    }
    const rows = Object.entries(byLesson).sort().map(([lesson,s]) => `<tr><td><strong>${escapeHtml(lesson)}</strong></td><td>${s.total}</td><td>${s.mcq||0}</td><td>${s.tf||0}</td><td>${s.fill||0}</td><td>${s.short||0}</td><td>${s.match||0}</td><td>${s.calc||0}</td><td>${s.hard}</td></tr>`).join('');
    $('statsOutput').innerHTML = `<table class="stats-table"><thead><tr><th>Bài</th><th>Tổng</th><th>MCQ</th><th>Đ/S</th><th>Điền</th><th>Ngắn</th><th>Ghép</th><th>Tính</th><th>Câu khó</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function exportExam(kind){
    if(!currentExam.length) generateExam();
    const seed = $('seed').value.trim() || 'exam';
    if(kind==='json'){
      download(`atmm-de-${safeName(seed)}.json`, JSON.stringify(currentExam, null, 2), 'application/json;charset=utf-8');
    } else {
      const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>Đề ATMMT ${escapeHtml(seed)}</title><style>${document.querySelector('style')?.textContent || ''}</style><link rel="stylesheet" href="styles.css"></head><body><main style="max-width:980px;margin:24px auto">${$('examMeta').outerHTML}${$('examOutput').outerHTML}</main></body></html>`;
      download(`atmm-de-${safeName(seed)}.html`, html, 'text/html;charset=utf-8');
    }
  }

  function download(filename, content, mime){
    const blob = new Blob([content], {type:mime});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 500);
  }

  function safeName(s){ return s.replace(/[^a-z0-9_-]+/gi,'-').replace(/-+/g,'-').slice(0,50); }
  function escapeHtml(v){
    return String(v).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }
  function escapeAttr(v){ return escapeHtml(v).replace(/`/g, '&#96;'); }

  function initTabs(){
    document.querySelectorAll('.tab').forEach(btn=>{
      btn.addEventListener('click',()=>{
        document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
        document.querySelectorAll('.tabPage').forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        $(btn.dataset.tab).classList.add('active');
      });
    });
  }

  function applySubjectDefaults(){
    const subject = getSubject();
    if(subject === 'qtm'){
      if($('mode')) $('mode').value = 'mixed';
      if($('difficulty')) $('difficulty').value = 2;
      if($('count')) $('count').value = 28;
      if($('examDuration')) $('examDuration').value = 90;
      document.querySelectorAll('input[name="qtype"]').forEach(x=>{ x.checked = true; });
    } else {
      if($('mode')) $('mode').value = 'docx';
      if($('difficulty')) $('difficulty').value = 2;
      if($('count')) $('count').value = 40;
      if($('examDuration')) $('examDuration').value = 75;
      document.querySelectorAll('input[name="qtype"]').forEach(x=>{ x.checked = x.value === 'mcq'; });
    }
  }

  function initSubjectBehavior(){
    $('subject')?.addEventListener('change',()=>{
      applySubjectDefaults();
      initFilters();
      renderTheory();
      renderStats();
      renderExamPicker();
      generateExam();
    });
  }

  function initModeBehavior(){
    $('mode').addEventListener('change',()=>{
      const mode = $('mode').value;
      if(mode==='qtm-batch'){
        if($('subject')) $('subject').value = 'qtm';
        if($('answerMode')) $('answerMode').value = 'practice';
        $('difficulty').value = 2;
        $('count').value = 28;
        if($('variantCount')) $('variantCount').value = EXAM_CATALOG_SIZE;
        if($('examDuration')) $('examDuration').value = 90;
        document.querySelectorAll('input[name="qtype"]').forEach(x=>{ x.checked = true; });
        initFilters();
        renderTheory();
        renderStats();
      } else if(mode==='docx'){
        $('count').value = 40;
        if($('examDuration')) $('examDuration').value = 75;
        document.querySelectorAll('input[name="qtype"]').forEach(x=>{ x.checked = x.value==='mcq'; });
        $('difficulty').value = 2;
      } else if(mode==='hard'){
        $('difficulty').value = 3;
        $('count').value = 35;
        if($('examDuration')) $('examDuration').value = 60;
      } else if(mode==='quick'){
        $('count').value = 15;
        if($('examDuration')) $('examDuration').value = 25;
      }
      generateExam();
    });
    document.querySelectorAll('.mode-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        $('answerMode').value = btn.dataset.answerMode;
        generateExam();
      });
    });
    updateAnswerModeUI();
  }

  function updateAnswerModeUI(){
    const batchMode = $('mode')?.value === 'qtm-batch';
    if(batchMode && $('answerMode')) $('answerMode').value = 'practice';
    const examMode = !batchMode && $('answerMode')?.value === 'exam';
    $('submitExamBtn')?.classList.toggle('hidden', !examMode);
    $('submitExamNavBtn')?.classList.toggle('hidden', !examMode || examSubmitted);
    $('toggleAnswersBtn')?.classList.toggle('hidden', examMode && !examSubmitted);
    $('variantCount')?.closest('.field')?.classList.toggle('hidden', examMode);
    $('examDuration')?.closest('.field')?.classList.toggle('hidden', !examMode);
    $('examPickerSection')?.classList.toggle('hidden', batchMode);
    document.querySelectorAll('.mode-choice').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.answerMode === $('answerMode')?.value);
    });
    if(!examMode) stopTimer();
    updateQuestionNavigator();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    initFilters(); initTabs(); initSubjectBehavior(); initModeBehavior(); renderTheory(); renderStats(); renderExamPicker(); generateExam();
    $('generateBtn').addEventListener('click', generateExam);
    $('examNumber')?.addEventListener('change', ()=>selectExamNumber($('examNumber').value));
    $('examPicker')?.addEventListener('click', event => {
      const button = event.target.closest('[data-exam-number]');
      if(button) selectExamNumber(button.dataset.examNumber);
    });
    $('nextNewExamBtn')?.addEventListener('click', selectNextNewExam);
    $('submitExamBtn').addEventListener('click', ()=>submitExam(false));
    $('examOutput').addEventListener('click', (event)=>{
      const btn = event.target.closest('.option-btn');
      if(btn) selectAnswer(btn);
    });
    $('questionNavGrid')?.addEventListener('click', (event)=>{
      const btn = event.target.closest('.q-nav-btn');
      if(!btn) return;
      activeQuestionUid = btn.dataset.qid;
      updateQuestionNavigator();
      document.querySelector(`.question-card[data-qid="${CSS.escape(btn.dataset.qid)}"]`)?.scrollIntoView({behavior:'smooth', block:'start'});
    });
    $('toggleAnswersBtn').addEventListener('click', toggleAnswers);
    $('submitExamNavBtn')?.addEventListener('click', ()=>submitExam(false));
    $('printBtn').addEventListener('click', ()=>window.print());
    $('exportHtmlBtn').addEventListener('click', ()=>exportExam('html'));
    $('exportJsonBtn').addEventListener('click', ()=>exportExam('json'));
  });
})();
